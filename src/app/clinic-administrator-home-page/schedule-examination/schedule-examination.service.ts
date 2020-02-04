import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';
import {User} from '../../model/user';
import {Room} from '../../model/room';
import {any} from 'codelyzer/util/function';
import {Observable} from 'rxjs';
import {MedicalExamination} from '../../model/medicalExamination';

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

  getAvailableRooms(id: string, date: string, term: string) {
    return this.http.get<Room[]>('http://localhost:8080/getClinicRooms/' + id + '/' + date + '/' + term);
  }

  saveExamination(selectedRoom: string, date: string, price: number, duration: number, discount: number,
                  clinicid: string, doctorid: string, patientid: string, typeid: string, requestid: string, selectedTerm: string) {
    return this.http.put<any>('http://localhost:8080/saveExamination/' + date + '/' + price + '/' + duration
      + '/' + discount + '/' + selectedRoom + '/' + clinicid + '/' + doctorid + '/' + patientid + '/' + typeid
      + '/' + requestid + '/' + selectedTerm, any).subscribe();
  }

  public searchRoom(selectedName: string, selectedNumber: number): Observable<Room[]> {
      return this.http.get<Room[]>('http://localhost:8080/medicalExamRooms' + '/search?name=' + selectedName + '&number=' + selectedNumber);
  }

  getAllExams(roomid: number) {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/medicalExaminations/' + roomid);
  }

  getAvailableTermsForDoctor(id: string, date: string) {
    return this.http.get<string[]>('http://localhost:8080/getAvailableTermsForDoctor/' + id + '/' + date);
  }
}
