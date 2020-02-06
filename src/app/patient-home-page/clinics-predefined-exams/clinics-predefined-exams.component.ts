import {Component, OnInit} from '@angular/core';
import {ClinicsPredefinedExamsService} from './clinics-predefined-exams.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {MedicalExamination} from '../../model/medicalExamination';

@Component({
  selector: 'app-clinics-predefined-exams',
  templateUrl: './clinics-predefined-exams.component.html',
  styleUrls: ['./clinics-predefined-exams.component.css']
})
export class ClinicsPredefinedExamsComponent implements OnInit {

  loggedUser: User;
  clinicId: string;
  predefinedExaminations: MedicalExamination[] = [];

  constructor(private clinicsPredefinedExamsService: ClinicsPredefinedExamsService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.clinicId = params.clinic;
    });
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.clinicsPredefinedExamsService.getClinicsPredefinedExaminations(this.clinicId).subscribe(data => {
      this.predefinedExaminations = data;
    });
  }

  scheduleExamination(id: string) {
    this.clinicsPredefinedExamsService.schedulePredefinedExamination(id, this.loggedUser.id).subscribe(result => this.ngOnInit());
  }
}
