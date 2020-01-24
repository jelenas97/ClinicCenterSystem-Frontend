import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalExamination} from '../../model/medicalExamination';
import {any} from 'codelyzer/util/function';

@Injectable()
export class SchedulePredefinedExaminationsService {

  constructor(private http: HttpClient) {

  }

  getAllPredefinedExaminations() {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/getAllPredefinedExaminations');
  }

  schedulePredefinedExamination(id: string, patientId: string) {
    return this.http.put('http://localhost:8080/schedulePredefinedMedicalExamination/' + id + '/' + patientId, any);
  }
}
