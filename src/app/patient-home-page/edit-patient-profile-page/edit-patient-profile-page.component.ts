import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {EditPatientProfilePageService} from './edit-patient-profile-page.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-edit-patient-profile-page',
  templateUrl: './edit-patient-profile-page.component.html',
  styleUrls: ['./edit-patient-profile-page.component.css']
})
export class EditPatientProfilePageComponent implements OnInit {

  notifier: NotifierService;
  user: User;
  userData: FormGroup;

  constructor(private editPatientProfilePageService: EditPatientProfilePageService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    console.log(this.user);

    this.userData = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });
  }

  get f() {
    return this.userData.controls;
  }

  onSubmit() {
    this.editPatientProfilePageService.update(this.user).subscribe(result => this.gotoUser());
  }

  gotoUser() {
    this.router.navigate(['/patientProfilePage']);
    this.showNotification('success', 'You have successfully edited your profile!');
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
