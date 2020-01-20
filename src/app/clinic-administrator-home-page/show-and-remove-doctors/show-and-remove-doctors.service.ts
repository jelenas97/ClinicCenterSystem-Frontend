import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Observable} from 'rxjs';

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

  hasExam(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/hasExam/' + id);
  }
}
