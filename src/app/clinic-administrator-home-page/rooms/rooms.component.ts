import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomsService} from './rooms.service';
import {Room} from '../../model/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomsService: RoomsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.roomsService.getAll().subscribe(data => {
      this.rooms = data;
    });
  }

  changeRoomName(room: Room, event: any) {
    room.name = event.target.textContent;
  }

  changeRoomNumber(room: Room, event: any) {
    room.number = event.target.textContent;
  }

  editRoom(room: Room) {
    this.roomsService.update(room).subscribe(data => {
      this.ngOnInit();
    });
  }

  removeRoom(room: Room) {
    this.roomsService.remove(room.id).subscribe(data => {
      this.ngOnInit();
    });
  }

  addRoomPage() {

  }
}
