import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {FormBuilder} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ScheduleOperationService} from './schedule-operation.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-schedule-operation',
  templateUrl: './schedule-operation.component.html',
  styleUrls: ['./schedule-operation.component.css']
})
export class ScheduleOperationComponent implements OnInit {

  loggedUser: User;
  requestId: string;

  constructor(private route: ActivatedRoute, private scheduleOperationService: ScheduleOperationService,
              private userService: UserService, private formBuilder: FormBuilder, private router: Router, private datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      this.requestId = params.request;
    });
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
  }

}
