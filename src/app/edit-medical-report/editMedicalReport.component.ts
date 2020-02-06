import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EditMedicalReportService} from './editMedicalReport.service';
import {UserService} from '../service/user.service';
import {MedicalReport} from '../model/medicalReport';
import {Diagnosis} from '../model/diagnosis';
import {Medicament} from '../model/medicament';


@Component({
  selector: 'app-edit-medical-report',
  templateUrl: './editMedicalReport.component.html',
  styleUrls: ['./editMedicalReport.component.css']
})
export class EditMedicalReportComponent implements OnInit {

  medicalReport: MedicalReport;
  diagnoses: Diagnosis[];
  medicaments: Medicament[];
  medicalReportId: string;
  medicalReportData: FormGroup;
  selectedDiagnosis: any;
  selectedMedicament: any;

  constructor(private editMedicalReportService: EditMedicalReportService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) {
    this.medicalReport = new MedicalReport();

  }

  onSubmit() {
    this.medicalReport.diagnosisId = this.selectedDiagnosis;
    this.medicalReport.medicamentId = this.selectedMedicament;
    this.editMedicalReportService.update(this.medicalReport, this.medicalReportId).subscribe(result => this.gotoMedicalReport());
  }

  gotoMedicalReport() {
    this.router.navigate(['/patientMedicalRecord/' +  this.medicalReport.patientId ]);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.medicalReportId = params.get('id');
    });

    this.editMedicalReportService.getById(this.medicalReportId).subscribe(data => {
      this.medicalReport = data;
      this.editMedicalReportService.getAllDiagnosis().subscribe(data1 => {
        this.diagnoses = data1;
        this.selectedDiagnosis = this.medicalReport.diagnosisId;
        this.editMedicalReportService.getAllMedicaments().subscribe(data2 => {
          this.medicaments = data2;
          this.selectedMedicament = this.medicalReport.medicamentId;
        });
      });
    });

    this.medicalReportData = this.formBuilder.group({
      report: ['', [Validators.required]],
    });

  }
}
