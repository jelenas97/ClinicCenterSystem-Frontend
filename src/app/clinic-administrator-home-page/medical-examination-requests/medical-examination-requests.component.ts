import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {MedicalExaminationRequestsService} from './medical-examination-requests.service';
import {User} from '../../model/user';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';

@Component({
  selector: 'app-medical-examination-requests',
  templateUrl: './medical-examination-requests.component.html',
  styleUrls: ['./medical-examination-requests.component.css']
})
export class MedicalExaminationRequestsComponent implements OnInit {

  loggedUser: User;
  medicalExaminationRequests: MedicalExaminationRequest[];

  constructor(private medicalExaminationRequestsService: MedicalExaminationRequestsService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.medicalExaminationRequestsService.getAllRequests(this.loggedUser.id).subscribe(data => {
      this.medicalExaminationRequests = data;
    });
  }

  schedule(request: MedicalExaminationRequest) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        request: request.id
      }
    }
    this.router.navigate(['scheduleExamination'], navigationExtras);
  }
}
