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

  public save(registration: RegistrationRequest) {
    location.reload();
    return this.http.post<RegistrationRequest>(this.registrationRequestsUrl + '/acceptRequest', registration);
  }
 public removeRequest(id: number) {
    return this.http.delete(this.registrationRequestsUrl + '/removeRequest/' + id);
  }
}
