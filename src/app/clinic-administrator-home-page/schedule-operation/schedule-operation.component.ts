import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ScheduleOperationService} from './schedule-operation.service';
import {User} from '../../model/user';
import {MedicalOperationRequest} from '../../model/medicalOperationRequest';
import {Room} from '../../model/room';

@Component({
  selector: 'app-schedule-operation',
  templateUrl: './schedule-operation.component.html',
  styleUrls: ['./schedule-operation.component.css']
})
export class ScheduleOperationComponent implements OnInit {

  loggedUser: User;
  userData: FormGroup;

  requestId: string;
  request: MedicalOperationRequest;
  dateOfOperation: Date;


  availableDoctors: User[];
  operationRooms: Room[];

  constructor(private route: ActivatedRoute, private scheduleOperationService: ScheduleOperationService,
              private userService: UserService, private formBuilder: FormBuilder, private router: Router, private datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      this.requestId = params.request;
    });
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.scheduleOperationService.getOperationRequest(this.requestId).subscribe(data => {
      this.request = data;
      // this.dateOfOperation = new Date(this.request.date);
    });
    this.scheduleOperationService.getAvailableDoctors(this.loggedUser.id).subscribe(data => {
      this.availableDoctors = data;
    });
    this.scheduleOperationService.getAvailableRooms(this.loggedUser.id).subscribe(data => {
      this.operationRooms = data;
    });
  }

}
