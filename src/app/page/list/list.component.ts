import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  listData = [];
  showDialog = false;
  dialogData: any = {};
  user: any;
  logout = true;

  @Input() storiesLoggedIn = false;

  userData: Subscription;

  @ViewChild('addVehicle', {static: false}) modal: AddVehicleComponent;

  constructor(private vehicleService: VehicleService, private userService: UserDetailsService) { }

  ngOnInit(): void {
    // this.getVehicleData();
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      this.user = loggedInUser;
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
    }, (error: any) => {
      console.log(error);
    });

    if(this.storiesLoggedIn) {
      this.logout = false;
    }
  }

  getVehicleDataForUser() {
    this.vehicleService.getVehicle(this.user.id).subscribe((result: any) => {
      this.listData = result;
    }, (error: any) => {
      console.log(error);
    });
  }

  getVehicleData() {
    this.vehicleService.getAllVehicles().subscribe((result: any) => {
      this.listData = result;
    }, (error: any) => {
      console.log(error);
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
    this.getVehicleDataForUser();
  }

  deleteDetails(data: any) {
    this.vehicleService.deleteVehicle(data).subscribe((result: any) => {
      this.getVehicleDataForUser();
    }, (error: any) => {
      console.log(error);
    })
  }

  ngOnDestroy() {
    this.userData.unsubscribe();
  }

}
