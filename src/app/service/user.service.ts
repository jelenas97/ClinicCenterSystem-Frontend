import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;
  private readonly userByIdUrl: string;
  private readonly users: string;


  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private http: HttpClient,
  ) {
    this.userByIdUrl = 'http://localhost:8080/users/';
    this.users = 'http://localhost:8080/users';
  }

  initUser() {
    const promise = this.apiService.get(this.config.refresh_token_url).toPromise()
      .then(res => {
        if (res.access_token !== null) {
          return this.getMyInfo().toPromise()
            .then(user => {
              this.currentUser = user;
            });
        }
      })
      .catch(() => null);
    return promise;
  }

  setupUser(user) {
    this.currentUser = user;
  }

  getMyInfo() {
    return this.apiService.get(this.config.whoami_url)
      .pipe(map(user => {
        this.currentUser = user;
        return user;
      }));
  }


  getAll() {
    return this.http.get<User[]>(this.users);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.userByIdUrl + id);
  }

}
