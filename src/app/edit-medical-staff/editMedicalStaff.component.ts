import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {EditMedicalStaffService} from './editMedicalStaff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-edit-medical-staff',
  templateUrl: './editMedicalStaff.component.html'
})
export class EditMedicalStaffComponent implements OnInit {
  user: User;
  userData: FormGroup;
  private role: string;

  constructor(private editMedicalStaffService: EditMedicalStaffService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService) {
    this.user = new User();

  }

  onSubmit() {
    this.editMedicalStaffService.update(this.user).subscribe(result => this.gotoUser());
  }

  gotoUser() {
    this.role = localStorage.getItem('role');
    if (this.role === 'ROLE_DOCTOR') {
      this.router.navigate(['/doctorProfilePage']);
    } else if (this.role === 'ROLE_NURSE') {
      this.router.navigate(['/nurseProfilePage']);
    }
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

