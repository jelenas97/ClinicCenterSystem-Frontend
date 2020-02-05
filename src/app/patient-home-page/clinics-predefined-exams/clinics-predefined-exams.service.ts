import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalExamination} from '../../model/medicalExamination';
import {any} from 'codelyzer/util/function';

@Injectable()
export class ClinicsPredefinedExamsService {

  constructor(private http: HttpClient) {
  }

  getClinicsPredefinedExaminations(id: string) {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/getClinicsPredefinedExaminations/' + id);
  }

  schedulePredefinedExamination(id: string, patientId: string) {
    return this.http.put('http://localhost:8080/schedulePredefinedMedicalExamination/' + id + '/' + patientId, any);
  }

}
