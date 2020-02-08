import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Diagnosis} from '../model/diagnosis';
import {DiagnosisService} from './diagnosis.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  diagnosis: Diagnosis;
  diagnoses: Diagnosis[] = [];
  userData: FormGroup;

  constructor(private diagnosisService: DiagnosisService, private formBuilder: FormBuilder) {
    this.diagnosis = new Diagnosis();
  }

  onSubmit() {
    this.diagnosisService.save(this.diagnosis).subscribe(result => this.ngOnInit());
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
}
