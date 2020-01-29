import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateClinicCenterAdminsService} from './create-clinic-center-admins.service';
import {User} from '../../model/user';
import {Clinic} from '../../model/clinic';

@Component({
  selector: 'app-create-clinic-center-admins',
  templateUrl: './create-clinic-center-admins.component.html',
  styleUrls: ['./create-clinic-center-admins.component.css']
})
export class CreateClinicCenterAdminsComponent implements OnInit {

  private readonly clinicAdmin: User;
  userData: FormGroup;
  clinics: Clinic[];

  constructor(private route: ActivatedRoute, private createClinicCenterAdminsService: CreateClinicCenterAdminsService,
              private router: Router, private formBuilder: FormBuilder) {
    this.clinicAdmin = new User();
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
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });
    this.createClinicCenterAdminsService.getAllClinics().subscribe(data => {
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

  addClinicAdmin() {
    this.createClinicCenterAdminsService.addClinicAdmin(this.clinicAdmin).subscribe(data => {
      this.router.navigate(['/allClinicAdmins']);
    });
  }

}
