import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { LoginComponent } from '../app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from '../app/registration/registration.component';


export default {
  title: 'Example/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      declarations: [RegistrationComponent],
      imports: [CommonModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      entryComponents: [RegistrationComponent]
    }),
  ],
} as Meta;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  component: LoginComponent,
  props: args
});

export const Login = Template.bind({})
Login.args = {
  showPopup: true,
  width: 400
};

export const Cancel = Template.bind({});
Cancel.args = {};
