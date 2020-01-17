import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../../../model/room';

@Injectable()
export class OperationRoomsService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/operationRooms';
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

  public searchRoom(selectedName: string, selectedNumber: number): Observable<Room[]> {
    return this.http.get<Room[]>(this.url + '/search?name=' + selectedName + '&number=' + selectedNumber);
  }
}
