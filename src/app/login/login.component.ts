import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {map, takeUntil} from 'rxjs/operators';
import {DisplayMessage} from '../shared/models/display-message';
import {UserService} from '../service/user.service';
import {AppComponent} from '../app.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) {
    return;
  }
  const pwd = c.parent.get('newPassword');
  const cpwd = c.parent.get('repeatNewPassword');

  if (!pwd || !cpwd) {
    return;
  }
  if (pwd.value !== cpwd.value) {
    return {invalid: true};
  }
}

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
  private passwordChanged: string;
  myGroup: FormGroup;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  data: string[] = [];

  get cpwd() {
    return this.myGroup.get('repeatNewPassword');
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private authService: AuthService, private appComponent: AppComponent,
              private modalService: NgbModal, private loginService: LoginService) {
    this.user = new User();

    this.myGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      repeatNewPassword: new FormControl('', [Validators.required, Validators.minLength(5), passwordConfirming])
    });
  }

  login() {
    this.notification = undefined;
    this.submitted = true;

    this.authService.login(this.userData.value)
      .subscribe(data => {
          this.role = sessionStorage.getItem('role');
          this.userService.getMyInfo().subscribe();
          this.appComponent.ngOnInit();
          if (this.role === 'ROLE_PATIENT') {
            this.router.navigate(['/patientHomePage']);
          } else if (this.role === 'ROLE_DOCTOR') {
            this.router.navigate(['/doctorHomePage']);
          } else if (this.role === 'ROLE_NURSE') {
            this.router.navigate(['/nurseHomePage']);
          } else if (this.role === 'ROLE_CLINIC_ADMIN') {
            this.router.navigate(['/clinicAdministratorHomePage']);
          } else if (this.role === 'ROLE_CLINIC_CENTER_ADMIN' || this.role === 'ROLE_CLINIC_CENTER_ADMIN_SUPER') {
            this.router.navigate(['/ccaHomePage']);
          }
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect email or password'};
        }
      );
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

  checkForChangePassword(mymodal) {

    this.authService.checkForChangePassword(this.userData.value).subscribe(data => {
      this.passwordChanged = sessionStorage.getItem('passwordChanged');

      if (this.passwordChanged === 'false') {
        this.modalService.open(mymodal);
      } else {
        this.login();
      }

    });

  }

  private changePassword(email: string, mymodal) {
    this.data.push(this.oldPassword, this.newPassword, this.repeatNewPassword, email);
    mymodal.newPassword = '';
    mymodal.oldPassword = '';
    this.modalService.dismissAll();
    this.loginService.changePassword(this.data).subscribe();
  }

  hasError = (field: string, reason: string) => {
    return this.myGroup.controls[field].hasError(reason);
  }

}

