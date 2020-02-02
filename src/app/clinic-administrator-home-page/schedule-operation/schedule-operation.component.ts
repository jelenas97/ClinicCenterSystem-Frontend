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


@Component({
  selector: 'app-schedule-operation',
  templateUrl: './schedule-operation.component.html',
  styleUrls: ['./schedule-operation.component.css']
})
export class ScheduleOperationComponent implements OnInit {

  loggedUser: User;
  userData: FormGroup;
  userData2: FormGroup;

  requestId: string;
  request: OperationRequest;
  dateOfOperation: Date;


  availableDoctors: Doctor[] = [];
  operationRooms: Room[];
  availableTerms: string[];

  selectedDate: any;
  selectedTerm: string;
  selectedPrice: string;
  selectedDiscount: string;
  selectedRoom: string;
  hiddenChange: boolean;

  dropdownList: Doctor[] = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  constructor(private route: ActivatedRoute, private scheduleOperationService: ScheduleOperationService,
              private userService: UserService, private formBuilder: FormBuilder, private router: Router, private datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      this.requestId = params.request;
    });
    this.selectedDate = new Date();
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.scheduleOperationService.getOperationRequest(this.requestId).subscribe(data => {
      this.request = data;
      this.dateOfOperation = new Date(this.request.date);
    });
    this.scheduleOperationService.getAvailableRooms(this.loggedUser.clinic.id).subscribe(data => {
      this.operationRooms = data;
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
    this.selectedItems.push(item);
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
    console.log(this.selectedDate);
    this.request.date = this.selectedDate;
    this.reset();
    console.log(this.selectedItems);
  }

  reset() {
    this.hiddenChange = false;
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

  selectRoom(id: string) {
    this.selectedRoom = id;
    document.getElementById('btnSchedule').hidden = false;
  }

  scheduleOperation() {
    document.getElementById('btnSchedule').hidden = true;
    this.scheduleOperationService.saveOperation(this.selectedRoom, this.datePipe.transform(this.request.date, 'yyyy_MM_dd HH:mm:ss'),
      +this.selectedPrice,
      this.request.duration, +this.selectedDiscount, this.request.clinic.id,
      this.request.doctor.id, this.request.patient.id, this.requestId,
      this.selectedTerm);
    this.router.navigate(['/clinicAdministratorHomePage']);
  }

  getAvailableDoctors(date: Date, selectedTerm: string) {
    console.log(selectedTerm);
    this.scheduleOperationService.getAvailableDoctorsForOperation(this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd'),
      selectedTerm, this.loggedUser.clinic.id, this.request.doctor.id).subscribe(data => {
      this.dropdownList = data;
      this.fillDoctors();
    });
  }

  fillDoctors() {
    console.log(this.availableDoctors);
    for (const doctor of this.availableDoctors) {
      this.dropdownList.push({
        id: doctor.id,
        firstName: doctor.firstName,
      });
    }
  }
}


interface Doctor {
  id: number;
  firstName: string;
}

