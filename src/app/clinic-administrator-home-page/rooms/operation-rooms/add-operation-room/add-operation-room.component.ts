import {Component, OnInit} from '@angular/core';
import {TypeOfMedicalExam} from '../../../../model/typeOfMedicalExam';
import {AddTypeOfMedicalExamService} from '../../../add-type-of-medical-exam/add-type-of-medical-exam.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../../../model/room';
import {AddOperationRoomService} from './add-operation-room.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-operation-room',
  templateUrl: './add-operation-room.component.html',
  styleUrls: ['./add-operation-room.component.css']
})
export class AddOperationRoomComponent implements OnInit {
  private readonly room: Room;
  userData: FormGroup;


  constructor(private addOperationRoomService: AddOperationRoomService, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private router: Router) {
    this.room = new Room();
  }

  ngOnInit() {
    this.userData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(3)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1)]]
    });
  }

  addOperationRoom() {
    this.addOperationRoomService.addRoom(this.room).subscribe(data => {
      this.router.navigate(['/operationRooms']);
    });
  }

  get f() {
    return this.userData.controls;
  }
}
