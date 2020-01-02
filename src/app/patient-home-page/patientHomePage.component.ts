import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {PatientHomePageService} from './patientHomePage.service';
import {UserService} from '../service/user.service';


@Component({
  templateUrl: 'patientHomePage.component.html',
  styleUrls: ['patientHomePage.component.css'],
  selector: 'app-medical-staff-profile'
})

export class PatientHomePageComponent implements OnInit {

  public user: User;

  constructor(private patientHomePageService: PatientHomePageService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
  }

}
