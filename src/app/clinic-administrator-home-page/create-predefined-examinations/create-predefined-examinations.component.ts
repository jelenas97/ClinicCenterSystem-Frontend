import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {CreatePredefinedExaminationsService} from './create-predefined-examinations.service';
import {User} from '../../model/user';
import {MedicalExaminationRequest} from '../../model/medicalExaminationRequest';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExaminationType} from '../../model/examinationType';
import {Clinic} from '../../model/clinic';
import {Room} from '../../model/room';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-crate-predefined-examinations',
  templateUrl: './create-predefined-examinations.component.html',
  styleUrls: ['./create-predefined-examinations.component.css']
})
export class CreatePredefinedExaminationsComponent implements OnInit {

  loggedUser: User;
  userData: FormGroup;
  helperClinic: Clinic;
  isTypeSelected = false;

  examinationTypes: ExaminationType[] = [];
  availableDoctors: User[];
  examinationRooms: Room[];

  selectedDate: any;
  selectedType: string;
  selectedDuration: string;
  selectedPrice: string;
  selectedDoctor: string;
  selectedRoom: string;
  selectedDiscount: string;

  todayDate: string;

  hiddenChange: boolean;
  hiddenRooms: boolean;
  selectedTerm: string;
  availableTerms: string[];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private createPredefinedExaminationsService: CreatePredefinedExaminationsService, private formBuilder: FormBuilder,
              private datePipe: DatePipe) {
    this.loggedUser = new User();
    this.selectedDate = new Date();
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.userData = this.formBuilder.group({
      selectedDate: ['', [Validators.required]],
      selectedType: ['', [Validators.required]],
      selectedPrice: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(6)]],
      selectedDuration: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(2)]],
      selectedDiscount: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(2)]],
      selectedDoctor: ['', [Validators.required]],
      selectedRoom: ['', [Validators.required]]
    });
    this.createPredefinedExaminationsService.getAllTypes().subscribe(data => {
      this.examinationTypes = data;
    });
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  get f() {
    return this.userData.controls;
  }

  createPredefinedExam() {
    console.log(this.selectedDate);
    console.log(this.selectedType);
    console.log(this.selectedDuration);
    console.log(this.selectedPrice);
    console.log(this.selectedDoctor);
    console.log(this.selectedRoom);
    console.log(this.selectedDiscount);
    this.createPredefinedExaminationsService.savePredefinedMedicalExamination(this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd'),
      this.selectedType,
      this.selectedDuration, this.selectedPrice, this.selectedDoctor, this.selectedRoom,
      this.selectedDiscount, this.selectedTerm, this.loggedUser.clinic.id).subscribe(
    );
    this.router.navigate(['clinicAdministratorHomePage']);
  }

  onSelectChange($event: Event) {
    console.log(this.selectedType);

    this.createPredefinedExaminationsService.getSearchedDoctors(this.selectedType, this.loggedUser.clinic.id).subscribe(data => {
      this.availableDoctors = data;
    });
    this.isTypeSelected = true;
  }

  getTerms() {
    this.createPredefinedExaminationsService.getAvailableTermsForDoctor(this.selectedDoctor, this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd')).subscribe(data => {
      this.availableTerms = data;
      this.selectedTerm = this.availableTerms[0];
    });
    this.hiddenChange = true;
  }

  getRooms() {
    this.createPredefinedExaminationsService.getAvailableRooms(this.loggedUser.id,
      this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd'), this.selectedTerm).subscribe(data1 => {
      this.examinationRooms = data1;
    });
    this.hiddenRooms = true;
  }
}
