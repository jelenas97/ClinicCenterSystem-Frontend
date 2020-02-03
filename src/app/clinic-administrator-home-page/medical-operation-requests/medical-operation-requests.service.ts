import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OperationRequest} from '../../model/operationRequest';

@Injectable()
export class MedicalOperationRequestsService {

  constructor(private http: HttpClient) {
  }

  getAllRequests(adminId: string) {
    return this.http.get<OperationRequest[]>('http://localhost:8080/auth/getAllOperationRequests');
  }
}
