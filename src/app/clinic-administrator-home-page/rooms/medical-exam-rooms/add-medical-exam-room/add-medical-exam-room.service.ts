import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../../../../model/room';
import {Observable} from 'rxjs';

@Injectable()
export class AddMedicalExamRoomService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/medicalExamRooms/';
  }

  public addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.url, room);

  }
}
