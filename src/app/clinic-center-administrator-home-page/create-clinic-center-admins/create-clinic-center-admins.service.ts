import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Clinic} from '../../model/clinic';
import {User} from '../../model/user';

@Injectable()
export class CreateClinicCenterAdminsService {

  constructor(private http: HttpClient) {
  }

  getAllClinics() {
    return this.http.get<Clinic[]>('http://localhost:8080/auth/getAllClinics');
  }

  addClinicAdmin(clinicCenterAdmin: User) {
    return this.http.post<User>('http://localhost:8080/addClinicCenterAdmin', clinicCenterAdmin);
  }

}
