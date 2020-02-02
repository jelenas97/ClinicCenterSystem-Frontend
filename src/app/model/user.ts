import {Optional} from '@angular/core';
import {MedicalExamination} from './medicalExamination';
import {Clinic} from './clinic';


export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  ssn: string;
  averageRating: string;
  examinationRequests: MedicalExamination[];
  clinic: Clinic;
  startWork: number;
  endWork: number;
  // this field is for number of exams that doctor have.. It is not from Spring model
  hasExam: boolean;
  passwordChanged: boolean;
}
