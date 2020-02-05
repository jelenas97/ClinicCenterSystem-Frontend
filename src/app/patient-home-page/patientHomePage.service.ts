import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Clinic} from '../model/clinic';
import {any} from 'codelyzer/util/function';
import {ExaminationType} from '../model/examinationType';
import {UserMapperTwo} from '../model/userMapperTwo';
import {MedicalExamination} from '../model/medicalExamination';
import {OperationRequest} from "../model/operationRequest";


@Injectable()
export class PatientHomePageService {

  private readonly url: string;
  private loggedUserId: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/auth/medicalStaffProfile/';
  }

  getAllExaminationsPatientCanRate(id: string) {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/getAllExaminationsPatientCanRate/' + id);
  }

  getAllOperationsPatientCanRate(id: string) {
    return this.http.get<OperationRequest[]>('http://localhost:8080/getAllOperationsPatientCanRate/' + id);
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(this.url + id);
  }

  getAllClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>('http://localhost:8080/auth/getAllClinics');
  }

  rateClinic(examId: string, rating: number, clinicId: string) {
    return this.http.put<any>('http://localhost:8080/auth/rateClinic/' + examId + '/' + rating + '/' + clinicId, any).subscribe();
  }

  rateDoctor(examId: string, rating: number, doctorId: string) {
    return this.http.put<any>('http://localhost:8080/auth/rateDoctor/' + examId + '/' + rating + '/' + doctorId, any).subscribe();
  }


  getAllTypes() {
    return this.http.get<ExaminationType[]>('http://localhost:8080/getAllMedicalExaminationTypes');
  }

  getSearchedClinics(selectedOption: string, selectedName: string, selectedRating: number) {
    if (selectedName === undefined || selectedName === '') {
      selectedName = ' ';
    }
    if (selectedRating === undefined || selectedRating === null) {
      selectedRating = 0.0;
    }
    return this.http.get<Clinic[]>('http://localhost:8080/auth/getSearchedClinics/' + selectedOption + '/'
      + selectedName + '/' + selectedRating);
  }

  getSearchedDoctors(selectedOption: string, id: string, date: string) {
    return this.http.get<UserMapperTwo[]>('http://localhost:8080/auth/getDoctorsThatCanDoExam/' + selectedOption + '/' + id +
      '/' + date);
  }

  sendRequest(selectedType: string, selectedDate: string, selectedClinicId: string, selectedDoctorId: string,
              patientId: string, selectedTerm: string) {
    return this.http.put<any>('http://localhost:8080/auth/sendMedicalExamRequest/' + selectedType + '/' + selectedDate +
      '/' + selectedClinicId + '/' + selectedDoctorId + '/' + patientId + '/' + selectedTerm, any).subscribe();
  }

  getSearchedDoctorsExtended(realSelectedOptionById: string, selectedClinicId: string, selectedFirstName: string, selectedLastName: string,
                             selectedDoctorRating: number) {

    if (selectedDoctorRating === undefined || selectedDoctorRating === null) {
      selectedDoctorRating = 0.0;
    }
    if (selectedFirstName === undefined || selectedFirstName === null) {
      selectedFirstName = '';
    }
    if (selectedLastName === undefined || selectedLastName === null) {
      selectedLastName = '';
    }
    return this.http.get<UserMapperTwo[]>('http://localhost:8080/getSearchedDoctorsExtended/search?firstName=' + selectedFirstName + '&lastName=' +
      selectedLastName + '&rating=' + selectedDoctorRating + '&type=' + realSelectedOptionById + '&clinic=' + selectedClinicId);

  }

  getAvailableTermsForDoctor(id: string, date: string) {
    return this.http.get<string[]>('http://localhost:8080/getAvailableTermsForDoctor/' + id + '/' + date);
  }

  rateClinicO(id: string, clinicRating: number, id2: string) {
    return this.http.put<any>('http://localhost:8080/auth/rateClinicO/' + id + '/' + clinicRating + '/' + id2, any).subscribe();
  }

  rateDoctorO(id: string, doctorRating: number, id2: string) {
    return this.http.put<any>('http://localhost:8080/auth/rateDoctorO/' + id + '/' + doctorRating + '/' + id2, any).subscribe();
  }
}
