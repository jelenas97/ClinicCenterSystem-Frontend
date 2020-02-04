import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatientMedicalRecordService} from './patientMedicalRecord.service';
import {MedicalRecord} from '../model/medicalRecord';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {MedicalHistory} from '../model/medicalHistory';
import {Sort} from '@angular/material/sort';


@Component({
  templateUrl: 'patientMedicalRecord.component.html',
  selector: 'app-patient-medical-record'
})

export class PatientMedicalRecordComponent implements OnInit {
  private patient: User;
  private patientId: string;
  private medicalRecord: MedicalRecord;
  private medicalHistory: MedicalHistory[];
  private sortedData: MedicalHistory[];


  constructor(private activatedRoute: ActivatedRoute, private patientMedicalRecordService: PatientMedicalRecordService,
              private  userService: UserService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.patientId = params.get('id');
      this.patientMedicalRecordService.getById(this.patientId).subscribe(data2 => {
        this.medicalRecord = data2;
      });

      this.userService.getById(+this.patientId).subscribe(data3 => {
        this.patient = data3;
      });

      this.patientMedicalRecordService.getAllById(this.patientId).subscribe(data => {
        this.medicalHistory = data;
        this.sortedData = data;
      });
    });
  }

  sortData(sort: Sort) {
    const data = this.medicalHistory.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'dateExam': return compare(a.dateExam, b.dateExam, isAsc);
        case 'doctorName': return compare(a.doctorName, b.doctorName, isAsc);
        case 'clinicName': return compare(a.clinicName, b.clinicName, isAsc);
        case 'medicament': return compare(a.medicament, b.medicament, isAsc);
        case 'diagnosis': return compare(a.diagnosis, b.diagnosis, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
