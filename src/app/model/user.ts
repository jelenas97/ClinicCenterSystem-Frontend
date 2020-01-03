import {Optional} from '@angular/core';
import {MedicalExamination} from './medicalExamination';


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
}
