import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationRequest} from '../../model/registrationRequest';


@Injectable()
export class MoreInfoRegisterRequestService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/registrationRequest/';
  }

  public getById(id: number): Observable<RegistrationRequest> {
    return this.http.get<RegistrationRequest>(this.url + id);
  }

}
