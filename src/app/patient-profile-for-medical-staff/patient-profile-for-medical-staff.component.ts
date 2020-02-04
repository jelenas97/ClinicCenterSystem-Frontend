import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientProfileForMedicalStaffService} from './patient-profile-for-medical-staff.service';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {MedicalExamination} from '../model/medicalExamination';

@Component({
  selector: 'app-patient-profile-for-medical-staff',
  templateUrl: './patient-profile-for-medical-staff.component.html',
  styleUrls: ['./patient-profile-for-medical-staff.component.css']
})
export class PatientProfileForMedicalStaffComponent implements OnInit {

  patient: User;
  patientId: string;
  canBeginExam = true;
  canSeeRecord = true;
  medicalExamId: string;
  medicalExam: MedicalExamination;
  user: User;
  role: string;

  constructor(private ppfms: PatientProfileForMedicalStaffService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private router: Router) {
    this.patientId = this.router.getCurrentNavigation().extras.state.example;
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    this.role = sessionStorage.getItem('role');


  }

  ngOnInit() {
    this.ppfms.getPatient(this.patientId).subscribe(data => {
      this.patient = data;
    });
    if (this.role === 'ROLE_DOCTOR' ) {
      this.ppfms.doesPatientHaveExam(this.patientId, this.user.id).subscribe(data => {
        this.canBeginExam = data;
        this.ppfms.getMedicalExam(this.patientId, this.user.id).subscribe(data2 => {
          this.medicalExam = data2;
          this.medicalExamId = this.medicalExam.id;
        })
        this.canSeeRecord = data;
        if (this.canSeeRecord === true) {
          this.ppfms.doesPatientHadExam(this.patientId, this.user.id).subscribe(data1 => {
            this.canSeeRecord = data1;
          });
        }
      });
    } else if (this.role === 'ROLE_NURSE') {
      this.ppfms.nurseAndPatient(this.patientId, this.user.id).subscribe(data => {
        this.canSeeRecord = data;
      });
    }

  }

}
