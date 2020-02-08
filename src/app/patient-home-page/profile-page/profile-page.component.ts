import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {PatientHomePageService} from '../patientHomePage.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User;

  constructor(private patientHomePageService: PatientHomePageService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    this.patientHomePageService.getById(+this.user.id).subscribe(data => {
      this.user = data;
    });
  }

}
