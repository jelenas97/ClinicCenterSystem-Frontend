import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ScheduleOperationService} from './schedule-operation.service';
import {User} from '../../model/user';
import {Room} from '../../model/room';
import {OperationRequest} from '../../model/operationRequest';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {faArrowDown, faArrowUp, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {SlideInOutAnimation} from '../../patient-home-page/all-clinics/animations';


@Component({
  selector: 'app-schedule-operation',
  templateUrl: './schedule-operation.component.html',
  styleUrls: ['./schedule-operation.component.css'],
  animations: [SlideInOutAnimation]

})
export class ScheduleOperationComponent implements OnInit {

  loggedUser: User;
  userData: FormGroup;
  userData2: FormGroup;

  requestId: string;
  request: OperationRequest;
  dateOfOperation: Date;
  faArrow = faArrowDown;
  calendar = faCalendarAlt;


  availableDoctors: Doctor[] = [];
  operationRooms: Room[];
  searchedRooms: Room[];
  availableTerms: string[];

  selectedDate: any;
  selectedTerm: string;
  selectedPrice: string;
  selectedDiscount: string;
  selectedRoom: string;
  hiddenChange: boolean;
  hiddenDoctors: boolean;

  selectedName: string;
  selectedNumber: number;

  animationState = 'out';
  isSearchHidden = false;

  dropdownList: Doctor[] = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  dateOfOperationAsString: string;
  doctors: number[] = [];

  todayDate: string;
  realRoom: Room;
  vaild = true;

  constructor(private route: ActivatedRoute, private scheduleOperationService: ScheduleOperationService,
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
    this.scheduleOperationService.getOperationRequest(this.requestId).subscribe(data => {
      this.request = data;
      this.dateOfOperation = new Date(this.request.date);
      this.dateOfOperationAsString = this.datePipe.transform(this.request.date, 'yyyy_MM_dd HH:mm');
      this.selectedTerm = this.dateOfOperationAsString.split(' ')[1];
      console.log(this.selectedTerm);
      this.scheduleOperationService.getAvailableRooms(this.loggedUser.clinic.id, this.dateOfOperationAsString,
        this.selectedTerm).subscribe(data1 => {
        this.operationRooms = data1;
        this.searchedRooms = data1;
      });
    });

    this.userData = this.formBuilder.group({
      selectedPrice: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(6)]],
      selectedDiscount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(2)]]
    });
    this.userData2 = this.formBuilder.group({
      selectedDate: ['', [Validators.required]]
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: string) {
    console.log('proslednjen' + item);
    for (const i of this.selectedItems) {
      if (i.id === item) {
        console.log('iz petlje ' + this.selectedItems.indexOf(i));
        this.selectedItems.splice(this.selectedItems.indexOf(i), 1);
      }
    }
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    this.selectedItems.length = 0;
    this.selectedItems = items;
    console.log(this.selectedItems);
  }

  onDeSelectAll(items: any) {
    this.selectedItems.length = 0;
    console.log(this.selectedItems);
  }

  parseDate(dateString: Date): Date {
    console.log(this.selectedDate);
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  showChange() {
    this.selectedDate = this.request.date;
    this.hiddenChange = this.hiddenChange !== true;
    document.getElementById('btnChange').hidden = true;
    document.getElementById('btnConfirm').hidden = false;
    document.getElementById('btnReset').hidden = false;

    this.getTerms();
  }

  getTerms() {
    this.scheduleOperationService.getAvailableTermsForDoctor(this.request.doctor.id,
      this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd')).subscribe(data => {
      this.availableTerms = data;
    });
  }

  confirmChanges() {
    for (const item of this.selectedItems) {
      this.doctors.push(item.id);
    }
    console.log(this.selectedDate);
    this.request.date = this.selectedDate;
    this.reset();
    console.log(this.selectedItems);
  }

  reset() {
    this.hiddenChange = false;
    this.hiddenDoctors = false;
    document.getElementById('btnChange').hidden = false;
    document.getElementById('btnConfirm').hidden = true;
    document.getElementById('btnReset').hidden = true;
  }

  get ff() {
    return this.userData2.controls;
  }

  get f() {
    return this.userData.controls;
  }

  selectRoom(room: Room) {
    this.selectedRoom = room.id;
    this.realRoom = room;
    document.getElementById('btnSchedule').hidden = false;
  }

  scheduleOperation() {
    this.scheduleOperationService.getAvailableRooms(this.loggedUser.clinic.id, this.dateOfOperationAsString,
      this.selectedTerm).subscribe(data1 => {
      this.operationRooms = data1;

      this.scheduleOperationService.getAvailableDoctorsForOperation(this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd'),
        this.selectedTerm, this.loggedUser.clinic.id, this.request.doctor.id).subscribe(data => {
        this.dropdownList = data;
        console.log(this.dropdownList);
        console.log(this.doctors);
        for (const doctor of this.doctors) {
          if (!this.dropdownList.some((item) => item.id === doctor)) {
            this.vaild = false;
          }
        }
        console.log(this.operationRooms);
        console.log(this.selectedRoom);
        console.log(this.realRoom.id);
        console.log(this.vaild);
        if (this.operationRooms.some((item) => item.id === this.realRoom.id) && this.vaild) {
          document.getElementById('btnSchedule').hidden = true;
          this.request.price = +this.selectedPrice;
          this.request.discount = +this.selectedDiscount;
          console.log(this.request.price);
          console.log(this.request.discount);
          if (this.doctors.length === 0) {
            this.doctors.push(0.5);
          }
          this.scheduleOperationService.saveOperation(this.request, this.selectedRoom, this.datePipe.transform(this.request.date, 'yyyy_MM_dd HH:mm:ss'),
            this.requestId, this.selectedTerm, this.doctors);
          this.doctors.length = 0;
          this.router.navigate(['/clinicAdministratorHomePage']);
        } else {
          alert('nemereeee');
          this.doctors.length = 0;
        }
      });


    });
  }

  getAvailableDoctors(date: Date, selectedTerm: string) {
    console.log(selectedTerm);
    this.scheduleOperationService.getAvailableDoctorsForOperation(this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd'),
      this.selectedTerm, this.loggedUser.clinic.id, this.request.doctor.id).subscribe(data => {
      this.dropdownList = data;
    });
    this.hiddenDoctors = true;
  }


  onSearchSubmit(selectedName: string, selectedNumber: number) {
    if (selectedName) {
      this.searchedRooms = this.operationRooms.filter(x =>
        x.name.trim().toLowerCase().includes(selectedName.trim().toLowerCase())
      );
    } else if (selectedNumber) {
      this.searchedRooms = this.operationRooms.filter(x =>
        x.number.toString().includes(selectedNumber.toString()));
    } else {
      this.searchedRooms = this.operationRooms;
    }
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

  showCalendar(id: string) {
    this.router.navigate(['medicalOperationRoomOccupation'], {state: {example: id}});
  }

}


interface Doctor {
  id: number;
  firstName: string;
}

