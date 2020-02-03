import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../model/clinic';
import {PatientHomePageService} from '../patientHomePage.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {MedicalExamination} from '../../model/medicalExamination';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  notifier: NotifierService;
  loggedUser: User;

  medicalExaminations: MedicalExamination[];

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
  }

  onChangeSelect(id: number, exam: MedicalExamination) {
    exam.clinicRating = id;
    console.log(exam.id);
    console.log(exam.clinicRating);
  }

  rateClinic(exam: MedicalExamination) {
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
}
