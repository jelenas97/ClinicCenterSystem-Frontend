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
  hiddenSend: boolean;
  isAnyClinicSelected: boolean;
  isTypeSelected: boolean;

  constructor(private patientHomePageService: PatientHomePageService , private router: Router) { }

  ngOnInit() {
    this.patientHomePageService.getAllClinics().subscribe(data => {
      console.log(data.length);
      this.clinics = data;
    });

    this.patientHomePageService.getAllTypes().subscribe(data => {
      this.examinationTypes = data;
    });

  }

  onSearchSubmit(selectedOption: string) {
    this.isTypeSelected = true;
    if (selectedOption === 'No type') {
      this.selectedOption = 'No type';
      this.resetAllForm();
    } else {
      this.patientHomePageService.getSearchedClinics(selectedOption).subscribe(data => {
        this.clinics = data;
      });
    }
  }

  onSelectChange($event: Event) {
    console.log(this.selectedOption);
  }

  getDoctorFromSelectedClinic(selectedOption: string, id: string) {
    this.isAnyClinicSelected = true;
    this.patientHomePageService.getSearchedDoctors(selectedOption, id).subscribe(data => {
      this.doctors = data;
    });
  }

  showSendRequestButton() {
    this.hiddenSend = true;
  }

  resetAllForm() {
    this.hiddenSend = false;
    this.isTypeSelected = false;
    this.isAnyClinicSelected = false;
    this.patientHomePageService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
  }
}
