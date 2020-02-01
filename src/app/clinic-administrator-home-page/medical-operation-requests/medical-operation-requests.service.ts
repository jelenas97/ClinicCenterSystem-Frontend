import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalOperationRequest} from '../../model/medicalOperationRequest';

@Injectable()
export class MedicalOperationRequestsService {

  constructor(private http: HttpClient) {
  }

  getAllRequests(adminId: string) {
    return this.http.get<MedicalOperationRequest[]>('http://localhost:8080/auth/getAllOperationRequests');
  }
}
