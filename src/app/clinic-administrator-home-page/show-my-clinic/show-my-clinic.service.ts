import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Clinic} from '../../model/clinic';

@Injectable()
export class ShowMyClinicService {

  constructor(private http: HttpClient) {
  }

  getClinic(id: string) {
    return this.http.get<Clinic>('http://localhost:8080/auth/getAdminsClinic/' + id);
  }
}
