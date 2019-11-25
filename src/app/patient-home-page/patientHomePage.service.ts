import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';


@Injectable()
export class PatientHomePageService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/patientHomePage/';
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(this.url + id);
  }

}
