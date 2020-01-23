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

  getAvailableRooms(id: string) {
    return this.http.get<Room[]>('http://localhost:8080/getClinicRooms/' + id);
  }

  savePredefinedMedicalExamination(selectedDate: any, selectedType: string, selectedDuration: string, selectedPrice: string,
                                   selectedDoctor: string, selectedClinic: string, selectedRoom: string, selectedDiscount: string) {
    return this.http.post<MedicalExamination>('http://localhost:8080/savePredefinedMedicalExamination/' + selectedDate + '/' +
      selectedType + '/' + selectedDuration + '/' + selectedPrice + '/' + selectedDoctor + '/' + selectedClinic + '/' +
      selectedRoom + '/' + selectedDiscount, any);
  }
}
