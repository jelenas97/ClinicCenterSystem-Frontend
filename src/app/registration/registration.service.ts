import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RegistrationService {

  private readonly registerUrl: string;

  constructor(private httpClient: HttpClient) {
      this.registerUrl = 'http://localhost:8080/registration';
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.registerUrl, user);
  }

  public save(user: User) {
    return this.httpClient.post<User>(this.registerUrl, user);
  }

}
