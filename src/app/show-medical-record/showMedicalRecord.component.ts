import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MedicalRecord} from '../model/medicalRecord';
import {ShowMedicalRecordService} from './showMedicalRecord.service';
import {User} from '../model/user';


@Component({
  templateUrl: 'showMedicalRecord.component.html',
  selector: 'app-show-medical-record'
})

export class ShowMedicalRecordComponent implements OnInit {
  medicalRecord: MedicalRecord;
  medicalRecordId: string;
  patient: User;

  constructor(private showMedicalRecordService: ShowMedicalRecordService, private activatedRoute: ActivatedRoute) {
    this.patient = new User();
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.medicalRecordId = params.get('id');
    });

    this.showMedicalRecordService.getById(this.medicalRecordId).subscribe(data => {
      this.medicalRecord = data;
    });



    this.showMedicalRecordService.getByPatientId(this.medicalRecordId).subscribe(data => {
      this.patient = data;
    });


  }
}
