import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditMedicalStaffService} from '../../edit-medical-staff/editMedicalStaff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {EditProfilePageCCAService} from './editProfilePageCCA.service';

@Component({
  selector: 'app-clinic-center-administrator-home-page-edit-profile-page',
  templateUrl: './editProfilePageCCA.component.html',
  styleUrls: ['./editProfilePageCCA.component.css']
})
export class EditProfilePageCCAComponent implements OnInit {

  user: User;
  userData: FormGroup;

  constructor(private editProfilePageCCAService: EditProfilePageCCAService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService) {
    this.user = new User();

  }

  onSubmit() {
    this.editProfilePageCCAService.update(this.user).subscribe(result => this.gotoUser());
  }

  gotoUser() {
    this.router.navigate(['/ccaProfilePage']);
  }

  ngOnInit(): void {

    this.userData = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });

    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    console.log(this.user);


  }

  get f() {
    return this.userData.controls;
  }

}
