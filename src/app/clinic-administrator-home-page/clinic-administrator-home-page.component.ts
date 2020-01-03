import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {ClinicAdministratorHomePageService} from './clinic-administrator-home-page.service';

@Component({
  selector: 'app-clinic-administrator-home-page',
  templateUrl: './clinic-administrator-home-page.component.html',
  styleUrls: ['./clinic-administrator-home-page.component.css']
})
export class ClinicAdministratorHomePageComponent implements OnInit {

  loggedUser: User;

  constructor(private clinicAdministratorHomePageService: ClinicAdministratorHomePageService, private route: ActivatedRoute,
              private router: Router, private userService: UserService) {
    this.loggedUser = new User();
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    console.log('ovo je logovan korisnik kad se tek logujem' + this.loggedUser.firstName);
  }

}
