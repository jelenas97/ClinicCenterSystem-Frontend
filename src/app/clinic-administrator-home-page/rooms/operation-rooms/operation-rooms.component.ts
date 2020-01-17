import {Component, OnInit} from '@angular/core';
import {Room} from '../../../model/room';
import {MedicalExamRoomsService} from '../medical-exam-rooms/medical-exam-rooms.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OperationRoomsService} from './operation-rooms.service';

@Component({
  selector: 'app-operation-rooms',
  templateUrl: './operation-rooms.component.html',
  styleUrls: ['./operation-rooms.component.css']
})
export class OperationRoomsComponent implements OnInit {
  rooms: Room[] = [];
  selectedName: string;
  selectedNumber: number;

  constructor(private roomsService: OperationRoomsService, private route: ActivatedRoute, private router: Router) { }

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
    this.router.navigate(['/addOperationRoom']);
  }

  onSearchSubmit(selectedName: string, selectedNumber: number) {
    this.roomsService.searchRoom(selectedName, selectedNumber).subscribe(data => {
      this.rooms = data;
    });
  }
}
