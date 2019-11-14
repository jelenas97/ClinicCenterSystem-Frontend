import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  userData: FormGroup;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.user = new User();
  }

  login() {
    this.loginService.login(this.user).subscribe(result => this.gotoLogin());
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      email: ['', [Validators.required, this.emailDomainValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  emailDomainValidator(control: FormControl) {
    const email = control.value;
    const [name, domain] = email.split('@');
    if (domain !== 'gmail.com' && domain !== 'yahoo.com' && domain !== 'uns.ac.rs') {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      };
    } else {
      return null;
    }
  }

  get f() {
    return this.userData.controls;
  }
}

