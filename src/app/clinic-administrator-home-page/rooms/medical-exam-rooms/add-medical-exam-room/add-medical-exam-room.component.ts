import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../model/room';
import {AddOperationRoomService} from '../../operation-rooms/add-operation-room/add-operation-room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddMedicalExamRoomService} from './add-medical-exam-room.service';

@Component({
  selector: 'app-add-medical-exam-room',
  templateUrl: './add-medical-exam-room.component.html',
  styleUrls: ['./add-medical-exam-room.component.css']
})
export class AddMedicalExamRoomComponent implements OnInit {
  room: Room;

  constructor(private addMedicalExamRoomService: AddMedicalExamRoomService, private route: ActivatedRoute, private router: Router) {
    this.room = new Room();
  }

  ngOnInit() {

  }

  addMedicalExamRoom() {
    this.addMedicalExamRoomService.addRoom(this.room).subscribe(data => {
      this.router.navigate(['/medicalExamRooms']);
    });

  }
}
