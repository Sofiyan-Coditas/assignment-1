import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  _userDetails = new Subject<any>();
  constructor() {
    this.loggedInUser();
  }

  loggedInUser() {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      this._userDetails.next(loggedUser);
    } else {
      this._userDetails.next();
    }
  }

  userDetails(): Observable<any> {
    return this._userDetails.asObservable();
  }
}
