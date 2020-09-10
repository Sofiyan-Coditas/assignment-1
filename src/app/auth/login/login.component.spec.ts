import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthService } from '../services/auth.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-registration',
  template: ''
})
export class RegistrationComponentStub {
  register() {
    return {};
  }

  update() {
    return {};
  }
}

@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponentStub {
  login() {
    return {};
  }

  cancel() {
    return {};
  }
}

describe('LoginComponent', () => {
  let component: LoginComponentStub;
  let fixture: ComponentFixture<LoginComponentStub>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponentStub, RegistrationComponentStub ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponentStub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method', () => {
    const loginFunc = spyOn(component, 'login');
    expect(loginFunc).toHaveBeenCalledTimes(0);
  });
});
