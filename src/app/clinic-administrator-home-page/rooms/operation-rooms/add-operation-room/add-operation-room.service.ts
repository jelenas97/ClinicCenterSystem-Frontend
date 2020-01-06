import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../../../model/room';

@Injectable()
export class AddOperationRoomService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/operationRooms/';
  }

  public addRoom(room: Room): Observable<Room>{
    return this.http.post<Room>(this.url, room);

  }
}
