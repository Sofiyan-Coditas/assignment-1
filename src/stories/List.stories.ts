import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ListComponent } from '../app/page/list/list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddVehicleComponent } from '../app/page/add-vehicle/add-vehicle.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleService } from '../app/services/vehicle.service';

export default {
  title: 'Example/List',
  component: ListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [VehicleService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }),
  ],
} as Meta;

const Template: Story<ListComponent> = (args: ListComponent) => ({
  component: ListComponent,
  props: args,
});

export const List = Template.bind({});
List.args = {
  user: {},
};