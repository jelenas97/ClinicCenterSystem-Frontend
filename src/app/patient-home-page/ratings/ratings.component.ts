import { Component, OnInit } from '@angular/core';
import {Clinic} from '../../model/clinic';
import {PatientHomePageService} from '../patientHomePage.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {UserMapperTwo} from "../../model/userMapperTwo";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  clinics: Clinic[] = [];
  doctors: UserMapperTwo[] = [];
  buttonDisabled: boolean;
  selectedOption: string;
  selectedOption2: string;
  buttonDisabled2: boolean;

  constructor(private patientHomePageService: PatientHomePageService, private router: Router) { }

  ngOnInit() {
    this.patientHomePageService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
    this.patientHomePageService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  onChangeSelect($event: Event) {
    console.log(this.selectedOption);
    this.buttonDisabled = true;
  }

  rateClinic(id: string, selectedOption: string) {
    this.patientHomePageService.rateClinic(id, selectedOption);
    this.router.navigate(['/patientHomePage/allClinics']);
  }

  onChangeSelect2($event: Event) {
    console.log(this.selectedOption2);
    this.buttonDisabled2 = true;
  }

  rateDoctor(id: string, selectedOption2: string) {
    this.patientHomePageService.rateDoctor(id, selectedOption2);
  }
}
