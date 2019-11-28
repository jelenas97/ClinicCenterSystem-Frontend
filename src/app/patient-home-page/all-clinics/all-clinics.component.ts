import { Component, OnInit } from '@angular/core';
import {Clinic} from '../../model/clinic';
import {Router} from '@angular/router';
import {PatientHomePageService} from '../patientHomePage.service';


@Component({
  selector: 'app-all-clinics',
  templateUrl: './all-clinics.component.html',
  styleUrls: ['./all-clinics.component.css']
})
export class AllClinicsComponent implements OnInit {

  clinics: Clinic[] = [];

  constructor(private patientHomePageService: PatientHomePageService , private router: Router) { }

  ngOnInit() {
    this.patientHomePageService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
  }

}
