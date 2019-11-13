import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationRequest } from '../model/registrationRequest';
import {Observable} from 'rxjs';


@Injectable()
export class RegistrationRequestService {

  private readonly registrationRequestsUrl: string;

  constructor(private http: HttpClient) {
    this.registrationRequestsUrl = 'http://localhost:8080/registrationRequests';
  }

  public getAll(): Observable<RegistrationRequest[]> {
    return this.http.get<RegistrationRequest[]>(this.registrationRequestsUrl);
  }

}
