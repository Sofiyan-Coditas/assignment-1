import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from '../app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../app/header/header.component';


export default {
  title: 'Example/Header',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      entryComponents: [LoginComponent]
    }),
  ],
} as Meta;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  component: HeaderComponent,
  props: args
});

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
