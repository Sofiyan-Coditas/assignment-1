import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { UserDetailsService } from '../services/user-details.service';
import { Subscription, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ToggleSwitch } from '../lit-elements/toggle-switch';
import { Store, select, State, createSelector } from '@ngrx/store';
import { changeTheme } from '../state-management/theme.actions';

import { ModalService } from '../services/modal.service';

console.assert(ToggleSwitch !== undefined);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ViewChild('loginPopup', {read: ViewContainerRef}) loginPopup: ViewContainerRef;

  loggedIn = false;
  lightTheme = true;

  userData: Subscription;

  theme: Observable<string>;

  themeSubscrition: Subscription;

  initialTheme = '';

  constructor(
    private userService: UserDetailsService,
    private store: Store<{theme: string}>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
    ) {
    this.theme = this.store.pipe(select('theme'));
  }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
    }

    this.themeSubscrition = this.theme.pipe(
      map(x => {
        this.initialTheme = x;
      })
    ).subscribe();

    const toggleSwitch = document.querySelector('toggle-switch');
    toggleSwitch.addEventListener('changedTheme', (event) => {
      this.store.dispatch(changeTheme());
    })
  }

  openModal() {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.openModal(LoginComponent);
     // create the component factory
    //  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoginComponent);

    //  // add the component to the view
    //  const componentRef = this.loginPopup.createComponent(componentFactory);

    //  componentRef.instance.width = 400;
    //  componentRef.instance.closeModal.subscribe(() => {
    //    componentRef.destroy();
    //  });
  }

  userLoggedIn(event) {
    if (event.success) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    window.sessionStorage.clear();
    localStorage.clear();
    this.userService.loggedInUser();
    this.loggedIn = false;
  }

  themeChange(event) {
    event.stopPropagation();
    this.store.dispatch(changeTheme());
  }
  
}
