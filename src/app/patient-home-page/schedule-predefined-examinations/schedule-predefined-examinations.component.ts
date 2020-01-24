import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import {SchedulePredefinedExaminationsService} from './schedule-predefined-examinations.service';
import {MedicalExamination} from '../../model/medicalExamination';
import {User} from '../../model/user';

@Component({
  selector: 'app-schedule-predefined-examinations',
  templateUrl: './schedule-predefined-examinations.component.html',
  styleUrls: ['./schedule-predefined-examinations.component.css']
})
export class SchedulePredefinedExaminationsComponent implements OnInit {

  loggedUser: User;
  allPredefinedExaminations: MedicalExamination[];

  constructor(private schedulePredefinedExaminationsService: SchedulePredefinedExaminationsService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.schedulePredefinedExaminationsService.getAllPredefinedExaminations().subscribe(data => {
      this.allPredefinedExaminations = data;
    });
  }

  scheduleExamination(id: string) {
    this.schedulePredefinedExaminationsService.schedulePredefinedExamination(id, this.loggedUser.id).subscribe(result => this.ngOnInit());
  }
}
