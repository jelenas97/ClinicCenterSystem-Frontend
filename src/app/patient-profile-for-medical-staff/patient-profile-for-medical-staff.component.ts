import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientProfileForMedicalStaffService} from './patient-profile-for-medical-staff.service';
import {User} from '../model/user';

@Component({
  selector: 'app-patient-profile-for-medical-staff',
  templateUrl: './patient-profile-for-medical-staff.component.html',
  styleUrls: ['./patient-profile-for-medical-staff.component.css']
})
export class PatientProfileForMedicalStaffComponent implements OnInit {

  patient: User;
  patientId: string;

  constructor(private ppfms: PatientProfileForMedicalStaffService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.patientId = this.router.getCurrentNavigation().extras.state.example;

  }

  ngOnInit() {
    this.ppfms.getPatient(this.patientId).subscribe(data => {
      this.patient = data;
    });
  }

}
