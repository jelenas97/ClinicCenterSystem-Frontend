import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Diagnosis} from '../model/diagnosis';
import {DiagnosisService} from './diagnosis.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  diagnosis: Diagnosis;
  diagnoses: Diagnosis[] = [];

  constructor(private diagnosisService: DiagnosisService) {
    this.diagnosis = new Diagnosis();
  }

  onSubmit() {
    this.diagnosisService.save(this.diagnosis).subscribe(result => this.ngOnInit());
  }

  ngOnInit(): void {
    this.diagnosisService.getAll().subscribe(data => {
      this.diagnoses = data;
    });
  }
}
