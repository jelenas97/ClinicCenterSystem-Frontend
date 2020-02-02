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

  constructor(private editMedicalReportService: EditMedicalReportService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService) {
    this.medicalReport = new MedicalReport();

  }

  onSubmit() {
    this.editMedicalReportService.update(this.medicalReport).subscribe(result => this.gotoMedicalReport());
  }

  gotoMedicalReport() {
    this.router.navigate(['/showMedicalHistory/' + this.medicalReportId ]);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.medicalReportId = params.get('id');
    });

    this.editMedicalReportService.getAllDiagnosis().subscribe(data => {
      this.diagnoses = data;
    });

    this.editMedicalReportService.getAllMedicaments().subscribe(data => {
      this.medicaments = data;
    });

    this.editMedicalReportService.getById(this.medicalReportId).subscribe(data => {
      this.medicalReport = data;
    });

    this.medicalReportData = this.formBuilder.group({
      report: ['', [Validators.required]],
      diagnosis: ['', [Validators.required]],
      medicament: ['', [Validators.required]],
      therapy: ['', [Validators.required]],
    });
  }

}
