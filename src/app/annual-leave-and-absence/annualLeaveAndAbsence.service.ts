import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vacation} from '../model/vacation';

@Injectable()
export class AnnualLeaveAndAbsenceService {
  private readonly vacationUrl: string;

  constructor(private httpClient: HttpClient) {
    this.vacationUrl = 'http://localhost:8080/vacation';
  }

  public saveVacation(vacation: Vacation) {
    return this.httpClient.post<Vacation>(this.vacationUrl, vacation);
  }

}
