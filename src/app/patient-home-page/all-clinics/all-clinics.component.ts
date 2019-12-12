import { Component, OnInit } from '@angular/core';
import {Clinic} from '../../model/clinic';
import {Router} from '@angular/router';
import {PatientHomePageService} from '../patientHomePage.service';
import {ExaminationType} from '../../model/examinationType';
import {UserMapperTwo} from '../../model/userMapperTwo';

@Component({
  selector: 'app-all-clinics',
  templateUrl: './all-clinics.component.html',
  styleUrls: ['./all-clinics.component.css']
})
export class AllClinicsComponent implements OnInit {

  clinics: Clinic[] = [];
  examinationTypes: ExaminationType[] = [];
  selectedOption: string;
  doctors: UserMapperTwo[] = [];

  constructor(private patientHomePageService: PatientHomePageService , private router: Router) { }

  ngOnInit() {
    this.patientHomePageService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });

    this.patientHomePageService.getAllTypes().subscribe(data => {
      this.examinationTypes = data;
    });

  }

  onSearchSubmit(selectedOption: string) {
    this.patientHomePageService.getSearchedClinics(selectedOption).subscribe(data => {
      this.clinics = data;
    });
  }

  onSelectChange($event: Event) {
    console.log(this.selectedOption);
  }

  getDoctorFromSelectedClinic(selectedOption: string, id: string) {
    console.log('menjam radio butin');
    this.patientHomePageService.getSearchedDoctors(selectedOption, id).subscribe(data => {
      this.doctors = data;
    });
  }
}
