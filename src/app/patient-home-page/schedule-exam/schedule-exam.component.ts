import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../model/clinic';
import {PatientHomePageService} from '../patientHomePage.service';

@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent implements OnInit {

  clinics: Clinic[];

  constructor(private patientHomePageService: PatientHomePageService) {
  }

  ngOnInit() {
    this.patientHomePageService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
  }

}
