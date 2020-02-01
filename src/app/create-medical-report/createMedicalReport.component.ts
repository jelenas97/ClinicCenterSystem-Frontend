import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MedicalReport} from '../model/medicalReport';
import {Diagnosis} from '../model/diagnosis';
import {CreateMedicalReportService} from './createMedicalReport.service';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {Medicament} from '../model/medicament';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
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
  selectedDate: any;
  selectedTerm: any;
  isAnyTermSelected = true;
  private realDateAsString: string;
  hiddenLabel = true;
  hiddenTerms = true;
  availableTerms: string[];
  private realOperationDateAsString: string;
  private selectedDateOperation: any;
  hiddenTermsOperation = true;
  hiddenLabelOperation = true;
  selectedTermOperation: any;
  availableTermsOperation: string[];
  private isAnyTermSelectedOperation = true;



  constructor(private createMedicalReportService: CreateMedicalReportService, private route: ActivatedRoute,
              private router: Router, private userService: UserService, private modalService: NgbModal, private datePipe: DatePipe,
              private formBuilder: FormBuilder) {
    this.medicalReport = new MedicalReport();
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
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

  onSelectChange($event: Event) {
    console.log(this.medicalReport.diagnosisId);
  }

  onSelectChangeMed($event: Event) {
    console.log(this.medicalReport.medicamentId);

  }


  openModalExam(mymodal) {
    this.modalService.open(mymodal);
  }

  openModalOperation(mymodal2) {
    this.modalService.open(mymodal2);
  }

  parseDate(dateString: Date) {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  dateChanged($event: Event) {
    this.realDateAsString = this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd');

    this.createMedicalReportService.getAvailableTermsForDoctor(this.user.id, this.realDateAsString).subscribe(data => {
      this.availableTerms = data;
      if (this.availableTerms.length === 0) {
        this.hiddenLabel = false;
      } else {
        this.hiddenTerms = false;
        this.selectedTerm = this.availableTerms[0];
        this.isAnyTermSelected = false;
      }

    });
  }

  dateOperationChanged($event: Event) {
    this.realOperationDateAsString = this.datePipe.transform(this.selectedDateOperation, 'yyyy_MM_dd');

    this.createMedicalReportService.getAvailableTermsForDoctor(this.user.id, this.realOperationDateAsString).subscribe(data => {
      this.availableTermsOperation = data;
      if (this.availableTermsOperation.length === 0) {
        this.hiddenLabelOperation = false;
      } else {
        this.hiddenTermsOperation = false;
        this.selectedTermOperation = this.availableTermsOperation[0];
        this.isAnyTermSelectedOperation = false;
      }

    });
  }

  createMedicalExam(selectedDate: any, selectedTerm: any) {

  }

  createOperation(selectedDate: any, selectedTerm: any) {

  }
}
