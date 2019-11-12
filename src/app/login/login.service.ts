import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {
  private readonly loginUrl: string;

  constructor(private httpClient: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';
  }

  public login(user: User) {
    return this.httpClient.post<User>(this.loginUrl, user);
  }
}
