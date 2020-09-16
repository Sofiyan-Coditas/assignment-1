import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private rootViewContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  openModal(componentToInsert) {
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

    // add the component to the view
    const componentRef = componentToInsert.createComponent(componentFactory);

    componentRef.instance.width = 400;
    componentRef.instance.closeModal.subscribe(() => {
      this.removeModal(componentRef);
    });
    this.rootViewContainer.insert(componentRef.hostView);
  }

  removeModal(componentRef) {
    componentRef.destroy();
  }
}
