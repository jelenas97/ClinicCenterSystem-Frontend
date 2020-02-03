import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MedicalExamination} from '../../model/medicalExamination';

@Injectable()
export class ClinicExamsService {

  constructor(private http: HttpClient) {
  }

  getAllExamsDay(id: string) {
    return this.http.get<number[]>('http://localhost:8080/medicalExaminationsDaily/' + id);
  }

  getAllExamsMonth(id: string) {
    return this.http.get<number[]>('http://localhost:8080/medicalExaminationsMonthly/' + id);
  }

  getAllExamsYear(id: string) {
    return this.http.get<number[]>('http://localhost:8080/medicalExaminationsYearly/' + id);
  }
}
