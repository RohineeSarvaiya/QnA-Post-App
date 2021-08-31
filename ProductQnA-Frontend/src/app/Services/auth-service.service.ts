import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupModel } from '../Components/signup/SignupModel';
import { LoginRequest } from '../Components/login/loginRequest';
import { LoginResponse } from '../Components/login/loginResponse';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenModel = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) { }

  signup(signupModel:SignupModel)  {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupModel, { responseType: 'text' });
  }


  login(loginRequest: LoginRequest) {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequest).pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.loggedIn.emit(true);
        this.username.emit(data.username);
       
        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }


  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenModel)
      .pipe(tap(response => {
        

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenModel,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
  
}
