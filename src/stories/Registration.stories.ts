import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from '../app/registration/registration.component';


export default {
  title: 'Example/Registration',
  component: RegistrationComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }),
  ],
} as Meta;

const Template: Story<RegistrationComponent> = (args: RegistrationComponent) => ({
  component: RegistrationComponent,
  props: args,
  styles: [`.container {display: block}`]
});

export const Login = Template.bind({})
Login.args = {
  user: {},
};

export const Cancel = Template.bind({});
Cancel.args = {};
