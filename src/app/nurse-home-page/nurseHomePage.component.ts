import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {NurseHomePageService} from './nurseHomePage.service';
import {UserService} from '../service/user.service';
import {map} from 'rxjs/operators';
import {ApiService} from '../service/api.service';
import {ConfigService} from '../service/config.service';
import {Observable, of} from 'rxjs';

@Component({
  templateUrl: 'nurseHomePage.component.html',
  styleUrls: ['nurseHomePage.component.css'],
})

export class NurseHomePageComponent implements OnInit {

  user: Observable<User>;
  currentUser: User;
  firstName: Observable<string>;
  constructor(private nurseHomePageService: NurseHomePageService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getMyInfo();
    }

}
