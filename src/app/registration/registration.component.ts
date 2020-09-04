import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { trigger, transition, query, animateChild, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
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
export class RegistrationComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal: ElementRef;
  loginForm: FormGroup;
  @Input() width: number;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserDetailsService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  register() {
    if (!this.loginForm.valid) {
      this.errorMessage = 'Please enter all the details before saving!!';
      return;
    }
    const userData = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    this.authService.registerUser(userData).subscribe((result: any) => {
      this.close();
    }, (error: any) => {
      this.errorMessage = error.error.message;
    })
  }

}
