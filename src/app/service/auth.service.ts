import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {UserService} from './user.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {AppComponent} from '../app.component';

@Injectable()
export class AuthService {

  private comp: AppComponent;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
    private router: Router
  ) {
  }

  // tslint:disable-next-line:variable-name
  private access_token = null;
  private role = null;

  login(user) {
    const loginHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const body = {
      username : user.email,
      password : user.password
    };

    return this.apiService.post(this.config.login_url, JSON.stringify(body), loginHeaders)
      .pipe(map((res) => {
        this.access_token = res.accessToken;
        this.role = res.role;
        sessionStorage.setItem('role', this.role);
        sessionStorage.setItem('key', res.accessToken);
        this.loggedIn.next(true);
      }));

  }

  registration(user) {
    const registrationHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.registration_url, JSON.stringify(user), registrationHeaders)
      .pipe(map(() => {
      }));
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  changePassowrd(passwordChanger) {
    const passwordChangerHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.change_password_url, JSON.stringify(passwordChanger), passwordChangerHeaders)
      .pipe(map(() => {
        console.log('Password changer success');
      }));
  }

  tokenIsPresent() {
    return this.access_token !== undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

}
