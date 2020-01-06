import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {takeUntil} from 'rxjs/operators';
import {DisplayMessage} from '../shared/models/display-message';
import {UserService} from '../service/user.service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user: User;
  userData: FormGroup;

  submitted = false;
  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private role: string;

  constructor(private userService: UserService, private loginService: LoginService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private authService: AuthService, private appComponent: AppComponent) {
    this.user = new User();
  }

  login() {
    this.notification = undefined;
    this.submitted = true;

    this.authService.login(this.userData.value)
      .subscribe(data => {
          this.userService.getMyInfo().subscribe();
          this.appComponent.ngOnInit();
          this.role = localStorage.getItem('role');
          if (this.role === 'ROLE_PATIENT') {
              this.router.navigate(['/patientHomePage']);
          } else if (this.role === 'ROLE_DOCTOR') {
            this.router.navigate(['/doctorHomePage']);
          } else if (this.role === 'ROLE_NURSE') {
            this.router.navigate(['/nurseHomePage']);
          } else if (this.role === 'ROLE_CLINIC_ADMIN') {
            this.router.navigate(['/clinicAdministratorHomePage']);
          } else if (this.role === 'ROLE_CLINIC_CENTER_ADMIN') {
            this.router.navigate(['/ccaHomePage']);
          }
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect email or password'};
        }
      );
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

    this.route.params.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
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

