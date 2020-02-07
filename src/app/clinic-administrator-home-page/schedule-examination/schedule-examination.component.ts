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
  dateOfExamAsString: string;
  availableDoctors: User[];
  examinationRooms: Room[];
  searchedRooms: Room[];

  selectedDoctor: string;
  selectedDoctorId: string;
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

  todayDate: string;
  realRoom: Room;

  constructor(private route: ActivatedRoute, private scheduleExaminationService: ScheduleExaminationService,
              private userService: UserService, private formBuilder: FormBuilder, private router: Router, private datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      this.requestId = params.request;
    });
    this.selectedDate = new Date();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.scheduleExaminationService.getExaminationRequest(this.requestId).subscribe(data => {
      this.request = data;
      this.dateOfExam = new Date(this.request.date);
      this.dateOfExamAsString = this.datePipe.transform(this.request.date, 'yyyy_MM_dd HH:mm');
      this.selectedTerm = this.dateOfExamAsString.split(' ')[1];
      console.log(this.selectedTerm);
      this.selectedDoctorId = this.request.doctor.id;
      this.scheduleExaminationService.getAvailableRooms(this.loggedUser.id, this.dateOfExamAsString, this.selectedTerm).subscribe(data1 => {
        this.examinationRooms = data1;
        this.searchedRooms = data1;
        this.scheduleExaminationService.getAvailableDoctors(this.request.type.id, this.loggedUser.clinic.id,
          this.dateOfExamAsString, this.selectedDoctorId).subscribe(data2 => {
          this.availableDoctors = data2;
        });
      });
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
    const array = this.selectedDoctor.split(':');
    console.log(array[0]);
    const array2 = array[1].split(' ');
    console.log(array2[1]);
    console.log(array2[2]);
    this.selectedDoctorId = array[0];
    this.getTerms();
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
    this.scheduleExaminationService.getAvailableDoctors(this.request.type.id, this.loggedUser.clinic.id,
      this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd'), this.selectedDoctorId).subscribe(data1 => {
      this.availableDoctors = data1;
    });
    this.scheduleExaminationService.getAvailableTermsForDoctor(this.selectedDoctorId,
      this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd'), this.requestId).subscribe(data => {
      this.availableTerms = data;
      this.selectedTerm = this.availableTerms[0];
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
      this.selectedDoctorId = array[0];
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
    this.scheduleExaminationService.getAvailableRooms(this.loggedUser.id, this.dateOfExamAsString, this.selectedTerm).subscribe(data1 => {
      this.examinationRooms = data1;
      this.searchedRooms = data1;
    });
    this.hiddenChange = false;
    document.getElementById('btnChange').hidden = false;
    document.getElementById('btnConfirm').hidden = true;
    document.getElementById('btnReset').hidden = true;
  }

  selectRoom(room: Room) {
    this.selectedRoom = room.id;
    this.realRoom = room;
    document.getElementById('btnSchedule').hidden = false;
  }

  scheduleExamination() {
    this.scheduleExaminationService.getAvailableRooms(this.loggedUser.id, this.dateOfExamAsString, this.selectedTerm).subscribe(data1 => {
      this.examinationRooms = data1;
      console.log(this.examinationRooms);
      console.log(this.realRoom);
      if (this.examinationRooms.some((item) => item.id === this.realRoom.id)) {
        document.getElementById('btnSchedule').hidden = true;
        this.scheduleExaminationService.saveExamination(this.selectedRoom,
          this.datePipe.transform(this.request.date, 'yyyy_MM_dd HH:mm:ss'),
          this.request.price,
          this.request.duration, this.request.discount, this.request.clinic.id,
          this.request.doctor.id, this.request.patient.id, this.request.type.id, this.requestId,
          this.selectedTerm);
        this.router.navigate(['/clinicAdministratorHomePage']);
      } else {
        alert('nemereeeee');
      }
    });

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
    if (!selectedNumber && !selectedName) {
      this.searchedRooms = this.examinationRooms;
    } else {
      let num = selectedNumber + '';
      if (selectedName === undefined || selectedName === null) {
        selectedName = '';
      }
      if (selectedNumber === undefined || selectedNumber === null) {
        num = '';
      }
      this.searchedRooms = this.examinationRooms.filter(x =>
        x.name.trim().toLowerCase().includes(selectedName.trim().toLowerCase())
        && x.number.toString().includes(num)
      );
    }
  }

  showCalendar(id: string) {
    this.router.navigate(['medicalExamRoomOccupation'], {state: {example: id}});
  }

  parseDate(dateString: Date): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
