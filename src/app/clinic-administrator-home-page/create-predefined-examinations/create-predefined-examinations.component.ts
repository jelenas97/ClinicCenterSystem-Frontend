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
  selectedClinic: string;
  selectedRoom: string;
  selectedDiscount: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private createPredefinedExaminationsService: CreatePredefinedExaminationsService, private formBuilder: FormBuilder) {
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
    this.createPredefinedExaminationsService.getAvailableRooms(this.loggedUser.id).subscribe(data => {
      this.examinationRooms = data;
    });
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
    console.log(this.selectedClinic);
    console.log(this.selectedRoom);
    console.log(this.selectedDiscount);
    this.createPredefinedExaminationsService.savePredefinedMedicalExamination(this.selectedDate, this.selectedType,
      this.selectedDuration, this.selectedPrice, this.selectedDoctor, this.selectedClinic, this.selectedRoom,
      this.selectedDiscount).subscribe();
  }

  onSelectChange($event: Event) {
    console.log(this.selectedType);
    this.createPredefinedExaminationsService.getClinic(this.loggedUser.id).subscribe(data => {
      this.helperClinic = data;
      this.selectedClinic = this.helperClinic.id;
      this.createPredefinedExaminationsService.getSearchedDoctors(this.selectedType, this.selectedClinic).subscribe(data => {
        this.availableDoctors = data;
      });
    });
    this.isTypeSelected = true;
  }
}
