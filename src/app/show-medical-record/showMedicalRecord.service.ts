import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicalRecord} from '../model/medicalRecord';
import {User} from '../model/user';


@Injectable()
export class ShowMedicalRecordService {

  private readonly url: string;
  private readonly patientUrl: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/showMedicalRecord/';
    this.patientUrl = 'http://localhost:8080/getPatient/';
  }

  public getById(id: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(this.url + id);
  }

  public getByPatientId(id: string): Observable<User> {
    return this.http.get<User>(this.patientUrl + id);
  }


}
