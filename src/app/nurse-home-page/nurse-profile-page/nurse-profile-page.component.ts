import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {NurseProfilePageService} from './nurse-profile-page.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-nurse-profile-page',
  templateUrl: './nurse-profile-page.component.html',
  styleUrls: ['./nurse-profile-page.component.css']
})
export class NurseProfilePageComponent implements OnInit {

  loggedUser: User;

  constructor(private nurseProfilePageService: NurseProfilePageService, private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
  }

}
