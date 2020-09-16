import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetailsService } from '../../services/user-details.service';

import { AuthService } from '../../services/auth.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('myModal', { static: false }) modal: ViewContainerRef;
  @ViewChild('registration', { read: ViewContainerRef }) registrationModal: ViewContainerRef;

  @Output('closeModal') closeModal = new EventEmitter();

  @Input() width: number;

  @Output('isLogin') isLogin: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup;
  errorMessage = '';

  @Input() showPopup = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserDetailsService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.showPopup) {
      document.querySelector<HTMLElement>('.container').style.display = 'block';
      document.querySelector<HTMLElement>('#root').classList.add('light');
    }
  }

  close() {
    this.closeModal.emit(event);
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid username and password!!';
      return;
    }
    const userData = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
    this.authService.login(userData).subscribe((result: any) => {
      if (result) {
        window.sessionStorage.setItem('token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user[0]));
        this.userService.loggedInUser();
        this.isLogin.emit({ success: true });
        this.close();
      }
    }, (error: any) => {
      this.errorMessage = error.error.message;
    });

  }

  registerUser() {
    // this.close();
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RegistrationComponent);

    // add the component to the view
    const componentRef = this.registrationModal.createComponent(componentFactory);

    componentRef.instance.width = 400;
    componentRef.instance.closeModal.subscribe(() => {
      componentRef.destroy();
    });
  }

}
