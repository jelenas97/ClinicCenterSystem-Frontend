import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {Clinic} from '../../model/clinic';

@Injectable()
export class AddDoctorService {

  constructor(private http: HttpClient) {
  }

  addDoctor(doctor: User, selectedClinic: string) {
    return this.http.post<User>('http://localhost:8080/auth/addDoctor/' + selectedClinic, doctor);
  }

  getAllClinics() {
    return this.http.get<Clinic[]>('http://localhost:8080/auth/getAllClinics');
  }

}
