import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {PatientHomePageService} from './patientHomePage.service';

@Component({
  templateUrl: 'patientHomePage.component.html',
  styleUrls: ['patientHomePage.component.css'],
  selector: 'app-medical-staff-profile'
})

export class PatientHomePageComponent implements OnInit {

  user: User;

  constructor(private patientHomePageService: PatientHomePageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.patientHomePageService.getById(1).subscribe(data => {
      this.user = data;
    });


  }
}
