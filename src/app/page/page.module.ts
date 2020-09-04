import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page/page.component';
import { ListComponent } from './list/list.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';


@NgModule({
  declarations: [PageComponent, ListComponent, AddVehicleComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddVehicleComponent],
  providers: [VehicleService]
})
export class PageModule { }
