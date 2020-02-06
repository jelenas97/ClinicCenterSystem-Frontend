import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MedicalExamination} from '../../model/medicalExamination';
import {MedicalOperation} from '../../model/medicalOperation';

@Injectable()
export class RoomOccupationCalendarService {

  constructor(private http: HttpClient) {
  }

  getAllExams(roomid: number) {
    return this.http.get<MedicalExamination[]>('http://localhost:8080/medicalExaminations/' + roomid);
  }

  getAllOperations(roomid: number) {
    return this.http.get<MedicalOperation[]>('http://localhost:8080/medicalOperations/' + roomid);
  }
}
