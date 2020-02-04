import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExaminationType} from '../../model/examinationType';
import {Clinic} from '../../model/clinic';
import {User} from '../../model/user';
import {Room} from '../../model/room';
import {MedicalExamination} from '../../model/medicalExamination';
import {any} from 'codelyzer/util/function';

@Injectable()
export class CreatePredefinedExaminationsService {

  constructor(private http: HttpClient) {
  }

  getAllTypes() {
    return this.http.get<ExaminationType[]>('http://localhost:8080/getAllMedicalExaminationTypes');
  }

  getClinic(id: string) {
    return this.http.get<Clinic>('http://localhost:8080/auth/getAdminsClinic/' + id);
  }

  getSearchedDoctors(selectedOption: string, id: string) {
    return this.http.get<User[]>('http://localhost:8080/auth/getSearchedDoctors/' + selectedOption + '/' + id);
  }

  getAvailableRooms(id: string, date: string, term: string) {
    return this.http.get<Room[]>('http://localhost:8080/getClinicRooms/' + id + '/' + date + '/' + term);
  }

  savePredefinedMedicalExamination(selectedDate: any, selectedType: string, selectedDuration: string, selectedPrice: string,
                                   selectedDoctor: string, selectedRoom: string, selectedDiscount: string, term: string, clinicId: string) {
    return this.http.post<MedicalExamination>('http://localhost:8080/savePredefinedMedicalExamination/' + selectedDate + '/' +
      selectedType + '/' + selectedDuration + '/' + selectedPrice + '/' + selectedDoctor  + '/' +
      selectedRoom + '/' + selectedDiscount + '/' + term + '/' + clinicId, any);
  }

  getAvailableTermsForDoctor(id: string, date: string) {
    return this.http.get<string[]>('http://localhost:8080/getAvailableTermsForDoctor/' + id + '/' + date);
  }
}
