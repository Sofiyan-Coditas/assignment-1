import { Component, OnInit, ViewChild } from '@angular/core';
import { ListModel } from '../models/list.model';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listData = [];
  showDialog = false;
  dialogData: any = {};
  user: any;
  logout = true;

  userData: Subscription;

  @ViewChild('addVehicle', {static: false}) modal: AddVehicleComponent;

  constructor(private vehicleService: VehicleService, private userService: UserDetailsService) { }

  ngOnInit(): void {
    // this.getVehicleData();
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getVehicleDataForUser();
      this.logout = false;
    } else {
      this.logout = true;
      this.getVehicleData();
    }
    this.userData = this.userService.userDetails().subscribe((result: any) => {
      if (result) {
        this.user = result;
        this.logout = false;
        this.getVehicleDataForUser();
      } else {
        this.logout = true;
        this.getVehicleData();
      }
    })
  }

  getVehicleDataForUser() {
    this.vehicleService.getVehicle(this.user.id).subscribe((result: any) => {
      this.listData = result;
    });
  }

  getVehicleData() {
    this.vehicleService.getAllVehicles().subscribe((result: any) => {
      this.listData = result;
    });
  }

  openModal() {
    this.modal.open();
  }

  updateDetails(vehicleData) {
    this.dialogData = vehicleData;
    this.dialogData.edit = true;
    this.openModal();
  }

  vehicleData(event) {
    if (this.listData.findIndex(data => data.id === event.id) !== -1) {
      const index = this.listData.findIndex(data => data.id === event.id);
      this.listData[index] = event;
    }
  }

  deleteDetails(data: any) {
    this.vehicleService.deleteVehicle(data.id).subscribe((result: any) => {
      this.getVehicleDataForUser();
    })
  }

}
