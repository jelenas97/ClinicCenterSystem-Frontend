import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../model/clinic';
import {PatientHomePageService} from '../patientHomePage.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {MedicalExamination} from '../../model/medicalExamination';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  loggedUser: User;

  medicalExaminations: MedicalExamination[];

  constructor(private patientHomePageService: PatientHomePageService, private router: Router, private userService: UserService) {
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
  }

  onChangeSelect2(id: number, exam: MedicalExamination) {
    exam.doctorRating = id;
    console.log(exam.id);
    console.log(exam.doctorRating);
  }

  rateDoctor(exam: MedicalExamination) {
    this.patientHomePageService.rateDoctor(exam.id, exam.doctorRating, exam.doctor.id);
    this.router.navigate(['/ratings']);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
