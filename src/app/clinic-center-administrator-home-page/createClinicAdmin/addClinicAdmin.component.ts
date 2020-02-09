import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddClinicAdminService} from './addClinicAdmin.service';
import {Clinic} from '../../model/clinic';
import {UserService} from '../../service/user.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-add-clinic-admin',
  templateUrl: './addClinicAdmin.component.html',
  styleUrls: ['./addClinicAdmin.component.css']
})
export class AddClinicAdminComponent implements OnInit {

  private readonly clinicAdmin: User;
  userData: FormGroup;
  clinics: Clinic[];
  selectedClinic: string;
  notifier: NotifierService;
  ssns: string[] = [];
  emails: string[] = [];
  users: User[] = [];

  constructor(private addClinicAdminService: AddClinicAdminService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UserService,
              private notifierService: NotifierService) {
    this.clinicAdmin = new User();
    this.notifier = notifierService;
  }

  ngOnInit() {
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
      clinic: ['', [Validators.required]]
    });
    this.addClinicAdminService.getAllClinics().subscribe(data => {
      this.clinics = data;
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

  addClinicAdmin(selectedClinic: string) {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.users.length; i++) {
        this.ssns.push(this.users[i].ssn.toString());
        this.emails.push(this.users[i].email.toString());
      }

      if (this.emails.includes(this.clinicAdmin.email)) {
        this.showNotification('warning', 'This email is already in use. Write mail to user');
      } else if (this.ssns.includes(this.clinicAdmin.ssn)) {
        this.showNotification('warning', 'This ssn is already exist. Write mail to user');
      } else {
        this.addClinicAdminService.addClinicAdmin(this.clinicAdmin, selectedClinic).subscribe(data2 => {
          this.router.navigate(['/allClinicAdmins']);
        });
      }
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
