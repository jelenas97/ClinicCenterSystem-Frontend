import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {Room} from '../../model/room';
import {OperationRequest} from '../../model/operationRequest';
import {any} from "codelyzer/util/function";

@Injectable()
export class ScheduleOperationService {

  constructor(private http: HttpClient) {

  }

  getOperationRequest(requestId: string) {
    return this.http.get<OperationRequest>('http://localhost:8080/getMedicalOperationById/' + requestId);
  }

  getAvailableRooms(id: string) {
    return this.http.get<Room[]>('http://localhost:8080/getClinicOperationRooms/' + id);
  }

  getAvailableTermsForDoctor(id: string, date: string) {
    return this.http.get<string[]>('http://localhost:8080/getAvailableTermsForDoctor/' + id + '/' + date);
  }

  saveOperation(operationRequest: OperationRequest, selectedRoom: string, date: string, price: number, discount: number,
                requestId: string, selectedTerm: string) {
    return this.http.post<OperationRequest>('http://localhost:8080/saveOperation/' + selectedRoom + '/' + date +
      '/' + price + '/' + discount + '/' + requestId + '/' + selectedTerm, operationRequest).subscribe();
  }

  getAvailableDoctorsForOperation(date: string, term: string, clinicId: string, doctorId: string) {
    return this.http.get<Doctor[]>('http://localhost:8080/getAvailableDoctorsForOperation/' + date + '/' + term +
      '/' + clinicId + '/' + doctorId);
  }
}

interface Doctor {
  id: number;
  firstName: string;
}
