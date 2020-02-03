import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicalRecord} from '../model/medicalRecord';
import {MedicalHistory} from '../model/medicalHistory';



@Injectable()
export class PatientMedicalRecordService {

  private readonly url: string;
  private allMedicalHistoryUrl: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/showMedicalRecord/';
    this.allMedicalHistoryUrl = 'http://localhost:8080/medicalHistory/';
  }

  public getById(id: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(this.url + id);
  }

  getAllById(patientId: string) {
    return this.http.get<MedicalHistory[]>(this.allMedicalHistoryUrl + patientId );
  }
}
