import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EditMedicalRecordBasicInfoService} from './editMedicalRecordBasicInfo.service';
import {MedicalRecord} from '../model/medicalRecord';

@Component({
  selector: 'app-edit-medical-record-basic-info',
  templateUrl: './editMedicalRecordBasicInfo.component.html'
})
export class EditMedicalRecordBasicInfoComponent implements  OnInit {
  medicalRecord: MedicalRecord;
  medicalRecordData: FormGroup;
  medicalRecordId: string;

  constructor(private editMedicalRecordBasicInfoService: EditMedicalRecordBasicInfoService,
              private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) {
    this.medicalRecord = new MedicalRecord();

  }

  onSubmit() {
    this.editMedicalRecordBasicInfoService.update(this.medicalRecord).subscribe(result => this.gotoUser());
  }

  gotoUser() {
    this.router.navigate(['/startExam/' + this.medicalRecordId]).then(r => Error);
  }

  ngOnInit(): void {

    this.medicalRecordData = this.formBuilder.group({
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      bloodType: ['', [Validators.required]],
      diopter: ['', [Validators.required]]
    });

    this.route.paramMap.subscribe(params => {
      this.medicalRecordId = params.get('id');
    });

    this.editMedicalRecordBasicInfoService.getByPatientId(this.medicalRecordId).subscribe(data => {
      this.medicalRecord = data;
    });
  }
}

