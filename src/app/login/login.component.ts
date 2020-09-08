import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, query, animateChild, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetailsService } from '../services/user-details.service';

import { AuthService } from '../services/auth.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('host', [
      transition(':leave', [
        query('@container,@content', [
          animateChild()
        ])
      ]),
      transition(':enter', [
        query('@container,@content', [
          animateChild()
        ])
      ]),
    ]),
    trigger('content', [
      transition(':leave', [
        style({
          transform: 'scale(1)'
        }),
        animate('100ms ease-out', style({
          transform: 'scale(1.2)'
        })),
        animate('300ms ease-in', style({
          transform: 'scale(0)'
        }))
      ]),
      transition(':enter', [
        style({
          transform: 'scale(0.5)'
        }),
        animate('200ms ease-out', style({
          transform: 'scale(1.2)'
        })),
        animate('100ms ease-out', style({
          transform: 'scale(1)'
        }))
      ]),
    ]),
    trigger('container', [
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('230ms ease-in', style({
          opacity: 0,
        }))
      ]),
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('230ms ease-in', style({
          opacity: 1,
        }))
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  @ViewChild('myModal', { static: false }) modal: ElementRef;
  @ViewChild('registration', {static: false}) registrationModal: RegistrationComponent;

  @Input() width: number;

  @Output('isLogin') isLogin: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup;
  errorMessage = '';

  @Input() showPopup = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserDetailsService) { }

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

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
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
    this.close();
    this.registrationModal.open();
  }

}
