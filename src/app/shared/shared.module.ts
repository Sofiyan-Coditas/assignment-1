import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  exports: [],
  providers: []
})
export class SharedModule { }
