import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {NotifierService} from 'angular-notifier';
import {DatePipe} from '@angular/common';
import {User} from '../../model/user';
import {ShowAllClinicsService} from './show-all-clinics.service';
import {Clinic} from '../../model/clinic';

@Component({
  selector: 'app-show-all-clinics',
  templateUrl: './show-all-clinics.component.html',
  styleUrls: ['./show-all-clinics.component.css']
})
export class ShowAllClinicsComponent implements OnInit {

  user: User;
  clinics: Clinic[] = [];

  constructor(private showAllClinicsService: ShowAllClinicsService, private router: Router, private userService: UserService,
              private notifierService: NotifierService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    this.showAllClinicsService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
  }

}
