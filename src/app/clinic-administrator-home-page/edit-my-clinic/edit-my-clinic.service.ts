import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Clinic} from '../../model/clinic';

@Injectable()
export class EditMyClinicService {

  constructor(private http: HttpClient) {
  }

  getClinic(id: string) {
    return this.http.get<Clinic>('http://localhost:8080/auth/getAdminsClinic/' + id);
  }

  update(clinic: Clinic) {
    return this.http.put<Clinic>('http://localhost:8080/auth/updateClinic', clinic);
  }
}
