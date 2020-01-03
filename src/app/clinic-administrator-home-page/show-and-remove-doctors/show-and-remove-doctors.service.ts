import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';

@Injectable()
export class ShowAndRemoveDoctorsService {

  constructor(private http: HttpClient) {
  }

  getDoctors(id: string) {
    return this.http.get<User[]>('http://localhost:8080/auth/getDoctorsFromClinic/' + id);
  }

  removeDoctor(id: string) {
    return this.http.delete('http://localhost:8080/auth/removeDoctor/' + id);
  }
}
