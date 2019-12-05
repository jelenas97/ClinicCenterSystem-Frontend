import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class EditPatientProfilePageService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/medicalStaffProfile/';
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.url, user);
  }
}
