import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clinic} from '../../model/clinic';

@Injectable()
export class ShowAllClinicsService {

  constructor(private http: HttpClient) {
  }

  getAllClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>('http://localhost:8080/auth/getAllClinics');
  }

}
