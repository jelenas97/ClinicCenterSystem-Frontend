import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Clinic} from '../model/clinic';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable()
export class ClinicService {

  private readonly registerUrl: string;
  private readonly userTypeUrl: string;

  constructor(private httpClient: HttpClient) {
    this.registerUrl = 'http://localhost:8080/createClinic';
    this.userTypeUrl = 'http://localhost:8080/getAll';
  }

  public save(clinic: Clinic) {
    return this.httpClient.post<Clinic>(this.registerUrl, clinic);
  }

  public getAllAdmins(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userTypeUrl);
  }

}
