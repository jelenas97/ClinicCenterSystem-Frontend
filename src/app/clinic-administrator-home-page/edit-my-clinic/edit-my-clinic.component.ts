import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Clinic} from '../../model/clinic';
import {User} from '../../model/user';
import {EditMyClinicService} from './edit-my-clinic.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-edit-my-clinic',
  templateUrl: './edit-my-clinic.component.html',
  styleUrls: ['./edit-my-clinic.component.css']
})
export class EditMyClinicComponent implements OnInit {

  user: User;
  clinic: Clinic;
  userData: FormGroup;

  constructor(private editMyClinicService: EditMyClinicService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    console.log('afdasfasf' + this.user.id);
    this.editMyClinicService.getClinic(this.user.id).subscribe(data => {
      this.clinic = data;
    });
    this.userData = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      clinicAverageRating: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.editMyClinicService.update(this.clinic).subscribe(data => {
      this.router.navigate(['/myClinic']);
    });
  }

  get f() {
    return this.userData.controls;
  }
}
