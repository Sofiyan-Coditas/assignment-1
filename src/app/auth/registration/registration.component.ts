import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  @Input() showPopup = false;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
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
