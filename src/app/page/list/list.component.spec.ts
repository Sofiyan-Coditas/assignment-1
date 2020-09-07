import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { VehicleService } from 'src/app/services/vehicle.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ReactiveFormsModule],
      providers: [VehicleService, UserDetailsService]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ AddVehicleComponent ],
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
