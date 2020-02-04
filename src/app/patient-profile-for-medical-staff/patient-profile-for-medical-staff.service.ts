import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/user';
import {MedicalExamination} from '../model/medicalExamination';


@Injectable()
export class PatientProfileForMedicalStaffService {

  private readonly recipesUrl: string;

  constructor(private http: HttpClient) {
    this.recipesUrl = 'http://localhost:8080/';
  }

  getPatient(patientId: string) {
    return this.http.get<User>('http://localhost:8080/getPatient/' + patientId);

  }

  doesPatientHaveExam(patientId: string, doctorId: string) {
    return this.http.get<boolean>('http://localhost:8080/canStartExam/' + patientId + '/' + doctorId);
  }

  doesPatientHadExam(patientId: string, doctorId: string) {
    return this.http.get<boolean>('http://localhost:8080/pastExam/' + patientId + '/' + doctorId);
  }

  nurseAndPatient(patientId: string, nurseId: string) {
    return this.http.get<boolean>('http://localhost:8080/nurseAndPatient/' + patientId + '/' + nurseId);
  }

  getMedicalExam(patientId: string, doctorId: string) {
    return this.http.get<MedicalExamination>('http://localhost:8080/medicalExamPatientDoctor/' + patientId + '/' + doctorId);
  }
}
