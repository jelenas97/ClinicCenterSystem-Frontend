import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {ShowAndRemoveDoctorsService} from './show-and-remove-doctors.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-show-and-remove-doctors',
  templateUrl: './show-and-remove-doctors.component.html',
  styleUrls: ['./show-and-remove-doctors.component.css']
})
export class ShowAndRemoveDoctorsComponent implements OnInit {

  doctors: User[];
  loggedUser: User;

  constructor(private showAndRemoveDoctorsService: ShowAndRemoveDoctorsService, private route: ActivatedRoute,
              private router: Router, private userService: UserService) {
    this.loggedUser = new User();
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    console.log('ovo je logovan korisnik i prikazujem kad stisnem show all' + this.loggedUser.firstName);
    this.showAndRemoveDoctorsService.getDoctors(this.loggedUser.id).subscribe(data => {
      this.doctors = data;
    });

  }

  removeDoctor(id: string) {
    this.showAndRemoveDoctorsService.removeDoctor(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}
