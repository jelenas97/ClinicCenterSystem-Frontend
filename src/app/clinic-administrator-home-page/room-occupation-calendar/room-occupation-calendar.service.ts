import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MedicalExamination} from '../../model/medicalExamination';

@Injectable()
export class RoomOccupationCalendarService {

  constructor(private http: HttpClient) {
  }

  getAllExams(roomid: number) {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/medicalExaminations/' + roomid);
  }
}
