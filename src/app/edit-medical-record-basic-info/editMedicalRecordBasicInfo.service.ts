import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {MedicalRecord} from '../model/medicalRecord';


@Injectable()
export class EditMedicalRecordBasicInfoService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/editMedicalRecord/basicInfo';
  }

  public getByPatientId(id: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(this.url + '/' + id);
  }

  public update(medicalRecord: MedicalRecord): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(this.url, medicalRecord);
  }
}
