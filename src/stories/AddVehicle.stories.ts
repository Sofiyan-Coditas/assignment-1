import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddVehicleComponent } from '../app/page/add-vehicle/add-vehicle.component';


export default {
  title: 'Example/AddVehicle',
  component: AddVehicleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }),
  ],
} as Meta;

const Template: Story<AddVehicleComponent> = (args: AddVehicleComponent) => ({
  component: AddVehicleComponent,
  props: args
});

export const Save = Template.bind({})
Save.args = {
  showPopup: true,
};

export const Cancel = Template.bind({});
Cancel.args = {};
