import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ScheduleExaminationService} from './schedule-examination.service';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-schedule-examination',
  templateUrl: './schedule-examination.component.html',
  styleUrls: ['./schedule-examination.component.css']
})
export class ScheduleExaminationComponent implements OnInit {

  loggedUser: User;
  userData: FormGroup;

  requestId: string;
  request: MedicalExaminationRequest;
  availableDoctors: User[];

  selectedDoctor: string;
  selectedDate: any;
  selectedPrice: string;
  selectedDiscount: string;
  hiddenChange: boolean;

  constructor(private route: ActivatedRoute, private scheduleExaminationService: ScheduleExaminationService,
              private userService: UserService, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.requestId = params.request;
    });
    this.selectedDate = new Date();
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.scheduleExaminationService.getExaminationRequest(this.requestId).subscribe(data => {
      this.request = data;
    });
    this.scheduleExaminationService.getAvailableDoctors(this.loggedUser.id).subscribe(data => {
      this.availableDoctors = data;
    });
    this.userData = this.formBuilder.group({
      selectedPrice: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(6)]],
      selectedDiscount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(2)]],
      selectedDate: ['', [Validators.required]]
    });

  }

  get f() {
    return this.userData.controls;
  }

  onSelectChange($event: Event) {
    console.log(this.selectedDoctor);
  }

  showChange() {
    this.selectedDate = this.request.date;
    this.selectedPrice = this.request.price.toString();
    this.selectedDiscount = this.request.discount.toString();
    this.hiddenChange = this.hiddenChange !== true;
    document.getElementById('btnChange').hidden = true;
    document.getElementById('btnConfirm').hidden = false;
    document.getElementById('btnReset').hidden = false;
  }

  confirmChanges() {
    console.log(this.selectedDate);
    console.log(this.selectedDoctor);
    console.log(this.selectedPrice);
    console.log(this.selectedDiscount);

    if (this.selectedDoctor !== undefined && this.selectedDoctor !== 'No change') {
      const array = this.selectedDoctor.split(':');
      console.log(array[0]);
      const array2 = array[1].split(' ');
      console.log(array2[1]);
      console.log(array2[2]);
      this.request.doctor.id = array[0];
      this.request.doctor.firstName = array2[1];
      this.request.doctor.lastName = array2[2];
    }

    this.request.date = this.selectedDate;
    this.request.price = +this.selectedPrice;
    this.request.discount = +this.selectedDiscount;
    this.reset();
  }

  reset() {
    this.hiddenChange = false;
    document.getElementById('btnChange').hidden = false;
    document.getElementById('btnConfirm').hidden = true;
    document.getElementById('btnReset').hidden = true;
  }
}
