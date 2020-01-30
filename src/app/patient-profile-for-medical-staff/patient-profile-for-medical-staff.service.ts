import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User} from '../model/user';


@Injectable()
export class PatientProfileForMedicalStaffService {

  private readonly recipesUrl: string;

  constructor(private http: HttpClient) {
    this.recipesUrl = 'http://localhost:8080/';
  }

  getPatient(patientId: string) {
    return this.http.get<User>('http://localhost:8080/getPatient/' + patientId);

  }
}
