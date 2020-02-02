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

  saveOperation(selectedRoom: string, date: string, price: number, duration: number, discount: number,
                clinicid: string, doctorid: string, patientid: string, requestid: string, selectedTerm: string) {
    return this.http.put<any>('http://localhost:8080/saveExamination/' + date + '/' + price + '/' + duration
      + '/' + discount + '/' + selectedRoom + '/' + clinicid + '/' + doctorid + '/' + patientid + '/' +
      '/' + requestid + '/' + selectedTerm, any).subscribe();
  }

  getAvailableDoctorsForOperation(date: string, term: string, clinicId: string, doctorId: string) {
    return this.http.get<User[]>('http://localhost:8080/getAvailableDoctorsForOperation/' + date + '/' + term +
      '/' + clinicId + '/' + doctorId);
  }
}
