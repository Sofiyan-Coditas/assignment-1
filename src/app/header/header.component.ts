import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserDetailsService } from '../services/user-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('login', {static: false}) modal: LoginComponent;

  loggedIn = false;

  userData: Subscription;

  constructor(private userService: UserDetailsService) { }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
    }

    if (localStorage.getItem('user')) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    this.userData = this.userService.userDetails().subscribe((result: any) => {
      if (result) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }

  openModal() {
    this.modal.open();
  }

  userLoggedIn(event) {
    if (event.success) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    window.sessionStorage.clear();
    localStorage.clear();
    this.userService.loggedInUser();
    this.loggedIn = false;
  }

}
