import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MedicalExamRoomsService} from './medical-exam-rooms.service';
import {Room} from '../../../model/room';

@Component({
  selector: 'app-medical-exam-rooms',
  templateUrl: './medical-exam-rooms.component.html',
  styleUrls: ['./medical-exam-rooms.component.css']
})
export class MedicalExamRoomsComponent implements OnInit {
  rooms: Room[] = [];
  selectedName: string;
  selectedNumber: number;

  constructor(private roomsService: MedicalExamRoomsService, private route: ActivatedRoute, private router: Router) { }

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
    },
      error => {
        alert('Cannot remove room. It is scheduled!');
      });
  }

  addRoomPage() {
    this.router.navigate(['/addMedicalExamRoom']);
  }

  onSearchSubmit(selectedName: string, selectedNumber: number) {
    this.roomsService.searchRoom(selectedName, selectedNumber).subscribe(data => {
      this.rooms = data;
    });
  }
}
