import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MedicalExamination} from '../model/medicalExamination';
import {MedicalOperation} from '../model/medicalOperation';

@Injectable()
export class WorkCalendarService {

  private readonly allOperationsUrl: string;

  constructor(private http: HttpClient) {
    this.allOperationsUrl = 'http://localhost:8080/medicalOperations/doctor/';
  }

  getAllExams(id: string) {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/medicalExaminations/doctor/' + id);
  }

  getAllOperation(id: string) {
    return this.http.get<MedicalOperation[]>(this.allOperationsUrl + id);

  }
}
