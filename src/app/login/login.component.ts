import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.user = new User();
  }

  login() {
    this.loginService.login(this.user).subscribe(result => this.gotoLogin());
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

  }
}

