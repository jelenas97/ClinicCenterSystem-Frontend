import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {RegistrationRequest} from '../model/registrationRequest';
import {Clinic} from '../model/clinic';


@Injectable()
export class PatientHomePageService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/auth/medicalStaffProfile/';
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(this.url + id);
  }

  getAllClinics(): Observable<Clinic[]>  {
    return this.http.get<Clinic[]>('http://localhost:8080/auth/getAllClinics');
  }

}
