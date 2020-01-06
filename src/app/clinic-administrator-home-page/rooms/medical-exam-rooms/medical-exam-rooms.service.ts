import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../../model/room';


@Injectable()
export class MedicalExamRoomsService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/medicalExamRooms';
  }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }

  public remove(id: string) {
    return this.http.delete(this.url + '/removeRoom/' + id);
  }

  public update(room: any) {
    return this.http.put<Room>(this.url, room);
  }
}
