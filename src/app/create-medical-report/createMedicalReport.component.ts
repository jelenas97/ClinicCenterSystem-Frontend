import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MedicalReport} from '../model/medicalReport';
import {Diagnosis} from '../model/diagnosis';
import {CreateMedicalReportService} from './createMedicalReport.service';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {Medicament} from '../model/medicament';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-medical-report',
  templateUrl: './createMedicalReport.component.html',
  styleUrls: ['./createMedicalReport.component.css']
})
export class CreateMedicalReportComponent implements OnInit {
  medicalReport: MedicalReport;
  diagnoses: Diagnosis[] = [];
  medicaments: Medicament[] = [];
  user: User;
  selectedDiagnosis: string;
  selectedMedicament: string;
  medicalReportData: FormGroup;
  medicalReportId: string;

  constructor(private createMedicalReportService: CreateMedicalReportService, private route: ActivatedRoute,
              private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
    this.medicalReport = new MedicalReport();
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.medicalReportId = params.get('id');
    });

    this.medicalReportData = this.formBuilder.group({
      report: ['', [Validators.required]]
    });

    this.createMedicalReportService.getAllDiagnosis().subscribe(data => {
      this.diagnoses = data;
    });

    this.createMedicalReportService.getAllMedicaments().subscribe(data => {
      this.medicaments = data;
    });
  }

  onSubmit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    this.medicalReport.doctorId = this.user.id;
    this.medicalReport.diagnosisId = this.selectedDiagnosis;
    this.medicalReport.medicamentId = this.selectedMedicament;
    this.createMedicalReportService.save(this.medicalReport).subscribe(result => this.gotoHome());
  }

  gotoHome() {
    this.router.navigate(['/doctorHomePage']);
  }
}
