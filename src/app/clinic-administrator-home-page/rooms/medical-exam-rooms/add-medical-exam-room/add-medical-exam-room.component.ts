import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../model/room';
import {AddOperationRoomService} from '../../operation-rooms/add-operation-room/add-operation-room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddMedicalExamRoomService} from './add-medical-exam-room.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-medical-exam-room',
  templateUrl: './add-medical-exam-room.component.html',
  styleUrls: ['./add-medical-exam-room.component.css']
})
export class AddMedicalExamRoomComponent implements OnInit {
  private readonly room: Room;
  userData: FormGroup;


  constructor(private addMedicalExamRoomService: AddMedicalExamRoomService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private router: Router) {
    this.room = new Room();
  }

  ngOnInit() {
    this.userData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(3)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1)]]
    });
  }

  addMedicalExamRoom() {
    this.addMedicalExamRoomService.addRoom(this.room).subscribe(data => {
      this.router.navigate(['/medicalExamRooms']);
    });
  }
  get f() {
    return this.userData.controls;
  }
}
