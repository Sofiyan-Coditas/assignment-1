import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(userData: any) {
    return this.httpClient.post(ApiEndpoints.LOGIN, userData);
  }

  registerUser(userData: any) {
    return this.httpClient.post(ApiEndpoints.REGISTER, userData);
  }
}
