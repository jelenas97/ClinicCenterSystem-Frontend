import { Component, OnInit } from '@angular/core';
import {Clinic} from '../../model/clinic';
import {PatientHomePageService} from '../patientHomePage.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  clinics: Clinic[] = [];
  doctors: User[] = [];
  buttonDisabled: boolean;
  selectedOption: string;

  constructor(private patientHomePageService: PatientHomePageService, private router: Router) { }

  ngOnInit() {
    this.patientHomePageService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
  }

  onChangeSelect($event: Event) {
    console.log(this.selectedOption);
    this.buttonDisabled = true;
  }

  rateClinic(id: string, selectedOption: string) {
    this.patientHomePageService.rateClinic(id, selectedOption);
  }
}
