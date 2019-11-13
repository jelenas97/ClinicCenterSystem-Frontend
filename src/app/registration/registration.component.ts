import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {RegistrationService} from './registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  userData: FormGroup;

  constructor(private registerService: RegistrationService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
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
      ssn: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get f() {
    return this.userData.controls;
  }
}
