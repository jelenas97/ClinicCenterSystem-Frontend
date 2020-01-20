import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

@Injectable()
export class EditProfilePageCCAService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/clinicCenterAdmin/';
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(this.url + id);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.url, user);
  }
}
