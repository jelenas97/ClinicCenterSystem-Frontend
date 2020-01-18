import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';

@Injectable()
export class MedicalExaminationRequestsService {

  constructor(private http: HttpClient) {
  }

  getAllRequests(adminId: string) {
    return this.http.get<MedicalExaminationRequest[]>('http://localhost:8080/auth/getAllExaminationRequests/' + adminId);
  }
}
