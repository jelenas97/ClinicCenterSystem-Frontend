import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicalOperationRequest} from '../../model/medicalOperationRequest';
import {User} from "../../model/user";
import {Room} from "../../model/room";

@Injectable()
export class ScheduleOperationService {

  constructor(private http: HttpClient) {

  }

  getOperationRequest(requestId: string) {
    return this.http.get<MedicalOperationRequest>('http://localhost:8080/getMedicalOperationById/' + requestId);
  }

  getAvailableDoctors(id: string) {
    return this.http.get<User[]>('http://localhost:8080/getAvailableDoctorsFromClinic/' + id);
  }

  getAvailableRooms(id: string) {
    return this.http.get<Room[]>('http://localhost:8080/getClinicOperationRooms/' + id);
  }
}
