import {Component, OnInit} from '@angular/core';
import {PatientHomePageService} from '../patientHomePage.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {MedicalExamination} from '../../model/medicalExamination';
import {NotifierService} from 'angular-notifier';
import {OperationRequest} from '../../model/operationRequest';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  notifier: NotifierService;
  loggedUser: User;

  medicalExaminations: MedicalExamination[];
  operations: OperationRequest[];

  constructor(private patientHomePageService: PatientHomePageService, private router: Router, private userService: UserService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.patientHomePageService.getAllExaminationsPatientCanRate(this.loggedUser.id).subscribe(data => {
      this.medicalExaminations = data;
    });
    this.patientHomePageService.getAllOperationsPatientCanRate(this.loggedUser.id).subscribe(data => {
      this.operations = data;
    });
  }

  onChangeSelect(id: number, exam: MedicalExamination) {
    exam.clinicRating = id;
    console.log(exam.id);
    console.log(exam.clinicRating);
  }

  rateClinic(exam: MedicalExamination) {
    if (exam.clinicRating === undefined) {
      exam.clinicRating = 10;
    }
    this.patientHomePageService.rateClinic(exam.id, exam.clinicRating, exam.clinic.id);
    this.redirectTo('ratings');
    this.showNotification('success', 'You have successfully rated Clinic.');
  }

  onChangeSelect2(id: number, exam: MedicalExamination) {
    exam.doctorRating = id;
    console.log(exam.id);
    console.log(exam.doctorRating);
  }

  rateDoctor(exam: MedicalExamination) {
    if (exam.doctorRating === undefined) {
      exam.doctorRating = 10;
    }
    this.patientHomePageService.rateDoctor(exam.id, exam.doctorRating, exam.doctor.id);
    this.redirectTo('ratings');
    this.showNotification('success', 'You have successfully rated Doctor.');
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  onChangeSelect12(id: any, operation: OperationRequest) {
    operation.clinicRating = id;
    console.log(operation.id);
    console.log(operation.clinicRating);
  }

  onChangeSelect22(id: any, operation: OperationRequest) {
    operation.doctorRating = id;
    console.log(operation.id);
    console.log(operation.doctorRating);
  }

  rateClinicO(operation: OperationRequest) {
    this.patientHomePageService.rateClinicO(operation.id, operation.clinicRating, operation.clinic.id);
    this.redirectTo('ratings');
    this.showNotification('success', 'You have successfully rated Clinic.');
  }

  rateDoctorO(operation: OperationRequest) {
    this.patientHomePageService.rateDoctorO(operation.id, operation.doctorRating, operation.doctor.id);
    this.redirectTo('ratings');
    this.showNotification('success', 'You have successfully rated Doctor.');
  }
}
