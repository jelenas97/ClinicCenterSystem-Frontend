import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddDoctorService} from './add-doctor.service';
import {User} from '../../model/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  loggedUser: User;
  notifier: NotifierService;
  ssns: string[] = [];
  emails: string[] = [];
  users: User[] = [];
  private readonly doctor: User;
  userData: FormGroup;


  constructor(private addDoctorService: AddDoctorService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UserService,
              private notifierService: NotifierService) {
    this.doctor = new User();
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.userData = this.formBuilder.group({
      ssn: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, this.emailDomainValidator, Validators.pattern(/[^ @]*@[^ @]*/)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]],
      startWork: ['', [Validators.required, this.startWorkValidator, Validators.pattern(/^[0-9]*$/)]],
      endWork: ['', [Validators.required, this.endWorkValidator, Validators.pattern(/^[0-9]*$/)]]
    });
  }

  endWorkValidator(control: FormControl) {
    const endWork = control.value;
    if (endWork < 15 || endWork > 23) {
      return {
        startWorkDomain: {
          parsedStartWorkDomain: endWork
        }
      };
    } else {
      return null;
    }
  }

  startWorkValidator(control: FormControl) {
    const startWork = control.value;
    if (startWork < 6 || startWork > 14) {
      return {
        startWorkDomain: {
          parsedStartWorkDomain: startWork
        }
      };
    } else {
      return null;
    }
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

  addDoctor() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.users.length; i++) {
        this.ssns.push(this.users[i].ssn.toString());
        this.emails.push(this.users[i].email.toString());
      }

      if (this.emails.includes(this.doctor.email)) {
        this.showNotification('warning', 'This email is already in use. Write mail to user');
      } else if (this.ssns.includes(this.doctor.ssn)) {
        this.showNotification('warning', 'This ssn is already exist. Write mail to user');
      } else {
        this.addDoctorService.addDoctor(this.doctor, this.loggedUser.clinic.id).subscribe(data2 => {
          this.router.navigate(['/showAllDoctors']);
        });

      }
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
