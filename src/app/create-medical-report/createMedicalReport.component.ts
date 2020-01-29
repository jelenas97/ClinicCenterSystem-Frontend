import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MedicalReport} from '../model/medicalReport';
import {Diagnosis} from '../model/diagnosis';
import {Recipe} from '../model/recipe';
import {CreateMedicalReportService} from './createMedicalReport.service';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {Medicament} from '../model/medicament';


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

  constructor(private createMedicalReportService: CreateMedicalReportService, private route: ActivatedRoute,
              private router: Router, private userService: UserService) {
    this.medicalReport = new MedicalReport();
  }

  ngOnInit(): void {
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
    console.log(this.user.id);
    this.createMedicalReportService.save(this.medicalReport).subscribe(result => this.gotoHome());
  }

  gotoHome() {
    this.router.navigate(['/doctorHomePage']);
  }

  onSelectChange($event: Event) {
    console.log(this.medicalReport.diagnosisId);
  }

  onSelectChangeMed($event: Event) {
    console.log(this.medicalReport.medicamentId);

  }
}
