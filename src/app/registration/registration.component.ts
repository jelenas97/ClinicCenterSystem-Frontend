import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {RegistrationService} from './registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DisplayMessage} from '../shared/models/display-message';
import {Subject} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  userData: FormGroup;
  passwordRepeat: string;

  submitted = false;
  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private registerService: RegistrationService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService) {
    this.user = new User();
  }

  onSubmit() {
    this.registerService.save(this.user).subscribe(result => this.gotoUser());
  }

  gotoUser() {
    this.router.navigate(['/registration']);
  }

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
        ssn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]*$/)]],
        email: ['', [Validators.required, this.emailDomainValidator, Validators.pattern(/[^ @]*@[^ @]*/)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(5)]],
        firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
      },
      {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    if (!group.controls.password.touched) {
      return null;
    }
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordRepeat.value;
    return pass === confirmPass ? null : {notSame: true};
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

  register() {
    this.notification = undefined;
    this.submitted = true;

    this.authService.registration(this.userData.value)
      .subscribe(data => {
          // this.userService.getMyInfo().subscribe();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect email or password'};
        });
  }
}
