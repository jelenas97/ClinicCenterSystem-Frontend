import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {RegistrationService} from './registration.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User;

  constructor(private registerService: RegistrationService, private route: ActivatedRoute, private router: Router) {
    this.user = new User();
  }

  onSubmit() {
    this.registerService.save(this.user).subscribe(result => this.gotoUser());
  }

  gotoUser() {
    this.router.navigate(['/registration']);
  }
}
