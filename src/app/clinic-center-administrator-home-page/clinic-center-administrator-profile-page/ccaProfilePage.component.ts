import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import {CcaProfilePageService} from './ccaProfilePage.service';

@Component({
  selector: 'app-clinic-center-administrator-profile-page',
  templateUrl: './ccaProfilePage.component.html',
  styleUrls: ['./ccaProfilePage.component.css']
})
export class CcaProfilePageComponent implements OnInit {

  user: User;

  constructor(private ccaProfilePageService: CcaProfilePageService, private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    console.log(this.user);


  }
}
