import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { trigger, transition, query, animateChild, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal: ElementRef;
  registrationForm: FormGroup;
  @Input() width: number;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
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
    if (!this.registrationForm.valid) {
      this.errorMessage = 'Please enter all the details before saving!!';
      return;
    }
    const userData = {
      email: this.registrationForm.controls.email.value,
      password: this.registrationForm.controls.password.value
    }
    this.authService.registerUser(userData).subscribe((result: any) => {
      this.close();
    }, (error: any) => {
      this.errorMessage = error.error.message;
    })
  }

}
