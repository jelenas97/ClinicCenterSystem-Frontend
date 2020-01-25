import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MedicalExamination} from '../model/medicalExamination';

@Injectable()
export class WorkCalendarService {

  constructor(private http: HttpClient) {
  }

  getAllExams(id: string) {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/medicalExaminations/doctor/' + id);
  }
}
