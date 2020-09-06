import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LoginComponent } from '../login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export default {
    title: 'Header',
    excludeStories: /.*Data$/,
    decorators: [
        moduleMetadata({
            // imports both components to allow component composition with storybook
            declarations: [LoginComponent],
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }),
    ],
};

export const taskData = {
    id: '1',

    state: 'Task_INBOX',
    updated_at: new Date(2019, 0, 1, 9, 0),
};
export const Default = () => ({
    component: HeaderComponent,
    template: `
  <div class="header">
  <div class="logo">
    <img src="../../assets/images/logo.png" alt="">
  </div>

  <div class="section-right">
    <div class="switch-section">
      <!-- <app-toggle-switch></app-toggle-switch> -->
      <toggle-switch [selectedTheme]="theme | async"></toggle-switch>
      <span>Change Theme</span>
    </div>
    <div>
      <button *ngIf="!loggedIn" class="btn btn-transparent ml-8" (click)="openModal()">Login</button>
      <button *ngIf="loggedIn" class="btn btn-transparent ml-8" (click)="logout()">Logout</button>
    </div>
  </div>
</div>

<app-login #login [width]="'300px'" (isLogin)="userLoggedIn($event)"></app-login>
  `
    //   props: {
    //     selectedTheme: taskData,
    //   },
});