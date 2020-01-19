import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';
import {User} from '../../model/user';
import {Room} from '../../model/room';
import {any} from 'codelyzer/util/function';

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

  getAvailableRooms(id: string) {
    return this.http.get<Room[]>('http://localhost:8080/getClinicRooms/' + id);
  }

  saveExamination(selectedRoom: string, date: string, price: number, duration: number, discount: number,
                  clinicid: string, doctorid: string, patientid: string, typeid: string, requestid: string) {
    return this.http.put<any>('http://localhost:8080/saveExamination/' + date + '/' + price + '/' + duration
      + '/' + discount + '/' + selectedRoom + '/' + clinicid + '/' + doctorid + '/' + patientid + '/' + typeid
      + '/' + requestid, any).subscribe();
  }
}
