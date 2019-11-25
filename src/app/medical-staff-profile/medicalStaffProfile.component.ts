import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {MedicalStaffProfileService} from './medicalStaffProfile.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'medicalStaffProfile.component.html',
  selector: 'app-medical-staff-profile'
})

export class MedicalStaffProfileComponent implements OnInit {

  user: User;

  constructor(private medicalStaffService: MedicalStaffProfileService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.medicalStaffService.getById(1).subscribe(data => {
      this.user = data;
    });


  }
}
