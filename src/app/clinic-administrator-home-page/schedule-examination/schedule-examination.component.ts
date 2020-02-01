import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScheduleExaminationService} from './schedule-examination.service';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../model/room';
import {SlideInOutAnimation} from '../../patient-home-page/all-clinics/animations';
import {faArrowDown, faArrowUp, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-schedule-examination',
  templateUrl: './schedule-examination.component.html',
  styleUrls: ['./schedule-examination.component.css'],
  animations: [SlideInOutAnimation]

})
export class ScheduleExaminationComponent implements OnInit {

  loggedUser: User;
  userData: FormGroup;

  requestId: string;
  request: MedicalExaminationRequest;
  dateOfExam: Date;
  availableDoctors: User[];
  examinationRooms: Room[];

  selectedDoctor: string;
  selectedDate: any;
  selectedPrice: string;
  selectedDiscount: string;
  selectedRoom: string;
  hiddenChange: boolean;
  selectedTerm: string;
  availableTerms: string[];


  faArrow = faArrowDown;
  animationState = 'out';
  isSearchHidden = false;
  selectedName: string;
  selectedNumber: number;
  calendar = faCalendarAlt;

  constructor(private route: ActivatedRoute, private scheduleExaminationService: ScheduleExaminationService,
              private userService: UserService, private formBuilder: FormBuilder, private router: Router, private datePipe: DatePipe) {
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
      this.dateOfExam = new Date(this.request.date);
    });
    this.scheduleExaminationService.getAvailableDoctors(this.loggedUser.id).subscribe(data => {
      this.availableDoctors = data;
    });
    this.userData = this.formBuilder.group({
      selectedPrice: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(6)]],
      selectedDiscount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(2)]],
      selectedDate: ['', [Validators.required]],
    });
    this.scheduleExaminationService.getAvailableRooms(this.loggedUser.id).subscribe(data => {
      this.examinationRooms = data;
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

    this.getTerms();
  }

  getTerms() {
    this.scheduleExaminationService.getAvailableTermsForDoctor(this.request.doctor.id, this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd')).subscribe(data => {
      this.availableTerms = data;
    });
  }

  confirmChanges() {
    console.log(this.selectedDate);
    console.log(this.selectedDoctor);
    console.log(this.selectedPrice);
    console.log(this.selectedDiscount);

    if (this.selectedTerm === undefined) {
      this.selectedTerm = this.availableTerms[0];
    }
    console.log(this.selectedTerm);

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

  selectRoom(id: string) {
    this.selectedRoom = id;
    document.getElementById('btnSchedule').hidden = false;
  }

  scheduleExamination() {
    document.getElementById('btnSchedule').hidden = true;
    this.scheduleExaminationService.saveExamination(this.selectedRoom, this.datePipe.transform(this.request.date, 'yyyy_MM_dd HH:mm:ss'),
      this.request.price,
      this.request.duration, this.request.discount, this.request.clinic.id,
      this.request.doctor.id, this.request.patient.id, this.request.type.id, this.requestId,
      this.selectedTerm);
    this.router.navigate(['/clinicAdministratorHomePage']);
  }

  showSearchRoom($event: MouseEvent) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    if (this.isSearchHidden) {
      this.isSearchHidden = false;
      this.faArrow = faArrowDown;
    } else {
      this.isSearchHidden = true;
      this.faArrow = faArrowUp;
    }
  }

  onSearchRoomSubmit(selectedName: string, selectedNumber: number) {
    this.scheduleExaminationService.searchRoom(selectedName, selectedNumber).subscribe(data => {
      this.examinationRooms = data;
    });
  }

  showCalendar(id: string) {
    this.router.navigate(['roomOccupationCalendar'], {state: {example: id}});
  }

  parseDate(dateString: Date): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
