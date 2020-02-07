import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {UserService} from './user.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppComponent} from '../app.component';

@Injectable()
export class AuthService {

  private comp: AppComponent;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: string[] = [];

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
    private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  private access_token = null;
  private role = null;
  private passwordChanged = null;

  login(user): Observable<any> {
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
        this.passwordChanged = res.passwordChanged;
        localStorage.setItem('passwordChanged', this.passwordChanged);
        localStorage.setItem('role', this.role);
        localStorage.setItem('key', res.accessToken);
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

  checkForChangePassword(user) {
    const checkForChange = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    const body = {
      username : user.email,
      password : user.password
    };
    return this.apiService.post(this.config.check_for_change_password, JSON.stringify(body), checkForChange)
      .pipe(map((res) => {
        this.passwordChanged = res.passwordChanged;
        console.log(this.passwordChanged);
        localStorage.setItem('passwordChanged', this.passwordChanged);
        this.loggedIn.next(true);
      }));

  }

  tokenIsPresent() {
    return this.access_token !== undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

}
