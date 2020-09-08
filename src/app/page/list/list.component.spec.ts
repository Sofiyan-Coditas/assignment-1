import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { VehicleService } from 'src/app/services/vehicle.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-vehicle',
  template: ''
})
export class AddVehicleComponentStub {
  save() {
    return {};
  }

  update() {
    return {};
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [],
      providers: [VehicleService, UserDetailsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
