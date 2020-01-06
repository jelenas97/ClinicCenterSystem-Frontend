import {Component, OnInit} from '@angular/core';
import {TypeOfMedicalExam} from '../../../../model/typeOfMedicalExam';
import {AddTypeOfMedicalExamService} from '../../../add-type-of-medical-exam/add-type-of-medical-exam.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../../../model/room';
import {AddOperationRoomService} from './add-operation-room.service';

@Component({
  selector: 'app-add-operation-room',
  templateUrl: './add-operation-room.component.html',
  styleUrls: ['./add-operation-room.component.css']
})
export class AddOperationRoomComponent implements OnInit {
  room: Room;

  constructor(private addOperationRoomService: AddOperationRoomService, private route: ActivatedRoute, private router: Router) {
    this.room = new Room();
  }

  ngOnInit() {

  }

  addOperationRoom() {
    this.addOperationRoomService.addRoom(this.room).subscribe(data => {
      this.router.navigate(['/operationRooms']);
    });

  }
}
