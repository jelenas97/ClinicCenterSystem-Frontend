import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WorkCalendarService {

  constructor(private http: HttpClient) {
  }

}
