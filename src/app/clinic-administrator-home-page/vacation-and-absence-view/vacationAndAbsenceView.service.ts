import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vacation} from '../../model/vacation';

@Injectable()
export class VacationAndAbsenceViewService {

  private readonly vacationRequestsUrl: string;
  private readonly absenceRequestsUrl: string;
  private readonly  sendApproveMailUrl: string;
  private readonly deleteRequestUrl: string;
  private readonly sendRejectMailUrl: string;

  constructor(private http: HttpClient) {
    this.vacationRequestsUrl = 'http://localhost:8080/vacationRequests';
    this.absenceRequestsUrl = 'http://localhost:8080/absenceRequests';
    this.sendApproveMailUrl = 'http://localhost:8080/sendApproveMail';
    this.deleteRequestUrl = 'http://localhost:8080/deleteRequest/';
    this.sendRejectMailUrl = 'http://localhost:8080/sendRejectMail';

  }

  public getAllVacationRequests(id: string): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.vacationRequestsUrl + '/' + id);
  }

  public getAllAbsenceRequests(id: string): Observable<Vacation[]> {
    return  this.http.get<Vacation[]>(this.absenceRequestsUrl + '/' + id);
  }

  public sendApproveMail(requestVacation: Vacation, id: number) {
    return this.http.post<Vacation>(this.sendApproveMailUrl + '/' + id, requestVacation);
  }

  deleteRequest(id: number) {
    return this.http.delete<number>(this.deleteRequestUrl + id);
  }

  public sendRejectMail(reason: string, id: number) {
    return this.http.post<string>(this.sendRejectMailUrl + '/' + id, reason);
  }
}
