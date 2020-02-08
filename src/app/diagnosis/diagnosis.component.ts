import {Component, OnInit} from '@angular/core';
import {Diagnosis} from '../model/diagnosis';
import {DiagnosisService} from './diagnosis.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  diagnosis: Diagnosis;
  diagnoses: Diagnosis[] = [];
  userData: FormGroup;
  diagnosesCodes: string[] = [];
  notifier: NotifierService;

  constructor(private diagnosisService: DiagnosisService, private formBuilder: FormBuilder,
              private notifierService: NotifierService) {
    this.diagnosis = new Diagnosis();
    this.notifier = notifierService;
  }

  onSubmit() {
    this.diagnosisService.getAll().subscribe(data => {
      this.diagnoses = data;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.diagnoses.length; i++) {
        this.diagnosesCodes.push(this.diagnoses[i].code.toString());
      }

      if (this.diagnosesCodes.includes(this.diagnosis.code.toString())) {
        this.showNotification('warning', 'Diagnosis code is already in use!');
      } else {
        this.diagnosisService.save(this.diagnosis).subscribe(result => this.ngOnInit());
      }

    });
  }

  ngOnInit(): void {
    this.diagnosisService.getAll().subscribe(data => {
      this.diagnoses = data;
    });
    this.userData = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(4)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      group: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(4)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]]
    });
  }

  get f() {
    return this.userData.controls;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
