import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddDoctorService} from './add-doctor.service';
import {User} from '../../model/user';
import {Clinic} from '../../model/clinic';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  private readonly doctor: User;
  clinics: Clinic[];
  selectedClinic: string;
  userData: FormGroup;


  constructor(private addDoctorService: AddDoctorService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder) {
    this.doctor = new User();
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
      clinic: ['', [Validators.required]],
      startWork: ['', [Validators.required, this.startWorkValidator, Validators.pattern(/^[0-9]*$/)]],
      endWork: ['', [Validators.required, this.endWorkValidator, Validators.pattern(/^[0-9]*$/)]]
    });
    this.addDoctorService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
  }

  endWorkValidator(control: FormControl) {
    const endWork = control.value;
    if (endWork < 14 || endWork > 23) {
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
    if (startWork < 6 || startWork > 15) {
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

  addDoctor(selectedClinic: string) {
    console.log(this.doctor);
    this.addDoctorService.addDoctor(this.doctor, selectedClinic).subscribe(data => {
      this.router.navigate(['/allDoctors']);
    });
  }

  onSelectChange($event: Event) {
    console.log(this.selectedClinic);
  }
}
