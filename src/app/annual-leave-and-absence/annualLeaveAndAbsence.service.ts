import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vacation} from '../model/vacation';

@Injectable()
export class AnnualLeaveAndAbsenceService {
  private readonly absenceUrl: string;
  private readonly annualLeaveUrl: string;

  constructor(private httpClient: HttpClient) {
    this.absenceUrl = 'http://localhost:8080/absence';
    this.annualLeaveUrl = 'http://localhost:8080/vacation';
  }

  public saveAbsence(absence: Vacation) {
    return this.httpClient.post<Vacation>(this.absenceUrl, absence);
  }

  public saveAnnualLeave(annualLeave: Vacation) {
    return this.httpClient.post<Vacation>(this.annualLeaveUrl, annualLeave);
  }

}
