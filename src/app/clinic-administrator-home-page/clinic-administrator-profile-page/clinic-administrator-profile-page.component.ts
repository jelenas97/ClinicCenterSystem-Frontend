import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-clinic-administrator-profile-page',
  templateUrl: './clinic-administrator-profile-page.component.html',
  styleUrls: ['./clinic-administrator-profile-page.component.css']
})
export class ClinicAdministratorProfilePageComponent implements OnInit {

  user: User;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    console.log(this.user);
  }

}
