import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';
import {User} from "../../model/user";

@Injectable()
export class ScheduleExaminationService {

  constructor(private http: HttpClient) {
  }

  getExaminationRequest(requestId: string) {
    return this.http.get<MedicalExaminationRequest>('http://localhost:8080/getMedicalExaminationById/' + requestId);
  }

  getAvailableDoctors(id: string) {
    return this.http.get<User[]>('http://localhost:8080/getAvailableDoctorsFromClinic/' + id);
  }
}
