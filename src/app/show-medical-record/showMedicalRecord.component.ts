import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MedicalRecord} from '../model/medicalRecord';
import {ShowMedicalRecordService} from './showMedicalRecord.service';
import {User} from '../model/user';
import {MedicalExamination} from '../model/medicalExamination';


@Component({
  templateUrl: 'showMedicalRecord.component.html',
  selector: 'app-show-medical-record'
})

export class ShowMedicalRecordComponent implements OnInit {
  medicalRecord: MedicalRecord;
  patient: User;
  private exam: MedicalExamination;
  private examId: string;

  constructor(private showMedicalRecordService: ShowMedicalRecordService, private activatedRoute: ActivatedRoute) {
    this.patient = new User();
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.examId = params.get('id');
      this.showMedicalRecordService.getMedicalExam(this.examId).subscribe(data => {
        this.exam = data;
        this.showMedicalRecordService.getById(this.exam.patient.id).subscribe(data2 => {
          this.medicalRecord = data2;
        });
        this.showMedicalRecordService.getByPatientId(this.exam.id).subscribe(data3 => {
          this.patient = data3;
        });
      });
    });
  }
}
