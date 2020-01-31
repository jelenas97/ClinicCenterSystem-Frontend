import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {PatientHomePageService} from './patientHomePage.service';
import {UserService} from '../service/user.service';
import {NotifierService} from 'angular-notifier';


@Component({
  templateUrl: 'patientHomePage.component.html',
  styleUrls: ['patientHomePage.component.css'],
  selector: 'app-medical-staff-profile'
})

export class PatientHomePageComponent implements OnInit {

  notifier: NotifierService;

  public user: User;

  constructor(private patientHomePageService: PatientHomePageService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private notifierService: NotifierService) {
    this.user = new User();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
