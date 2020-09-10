import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { UserDetailsService } from '../services/user-details.service';
import { Subscription, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ToggleSwitch } from '../lit-elements/toggle-switch';
import { Store, select, State, createSelector } from '@ngrx/store';
import { changeTheme } from '../state-management/theme.actions';

console.assert(ToggleSwitch !== undefined);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('login', {static: false}) modal: LoginComponent;

  loggedIn = false;
  lightTheme = true;

  userData: Subscription;

  theme: Observable<string>;

  themeSubscrition: Subscription;

  initialTheme = '';

  constructor(private userService: UserDetailsService, private store: Store<{theme: string}>) {
    this.theme = this.store.pipe(select('theme'));
  }

  ngOnInit(): void {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
    }

    this.themeSubscrition = this.theme.pipe(
      map(x => {
        this.initialTheme = x;
      })
    ).subscribe();

    const toggleSwitch = document.querySelector('toggle-switch');
    toggleSwitch.addEventListener('changedTheme', (event) => {
      this.store.dispatch(changeTheme());
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

  themeChange(event) {
    event.stopPropagation();
    this.store.dispatch(changeTheme());
  }
  
}
