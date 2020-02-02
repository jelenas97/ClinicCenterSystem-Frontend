import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../model/clinic';
import {Router} from '@angular/router';
import {PatientHomePageService} from '../patientHomePage.service';
import {ExaminationType} from '../../model/examinationType';
import {UserMapperTwo} from '../../model/userMapperTwo';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {SlideInOutAnimation} from './animations';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {NotifierService} from 'angular-notifier';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-all-clinics',
  templateUrl: './all-clinics.component.html',
  styleUrls: ['./all-clinics.component.css'],
  animations: [SlideInOutAnimation]

})
export class AllClinicsComponent implements OnInit {

  notifier: NotifierService;


  faArrow = faArrowDown;
  faArrow2 = faArrowDown;

  animationState = 'out';
  animationState2 = 'out';

  availableTerms: string[];
  selectedTerm: string;
  hiddenTerms = true;
  hiddenLabel = true;
  hiddenHeader = true;

  clinics: Clinic[] = [];
  examinationTypes: ExaminationType[] = [];
  selectedOption: string;
  realSelectedOptionById: string;
  selectedDate: any;
  selectedClinicId: string;
  selectedDoctorId: string;
  selectedName: string;
  selectedRating: number;
  doctors: UserMapperTwo[] = [];
  hiddenSend: boolean;
  isAnyClinicSelected: boolean;
  isTypeSelected: boolean;
  isSearchHidden = false;
  isSearchDoctorHidden = false;
  selectedFirstName: string;
  selectedLastName: string;
  selectedDoctorRating: number;

  realDateAsString: string;

  public user: User;

  constructor(private patientHomePageService: PatientHomePageService, private router: Router, private userService: UserService,
              private notifierService: NotifierService, private datePipe: DatePipe) {
    this.selectedDate = new Date();
    this.user = new User();
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    console.log('logovan pacijent' + this.user.firstName);
    this.patientHomePageService.getAllClinics().subscribe(data => {
      console.log(data.length);
      this.clinics = data;
    });

    this.patientHomePageService.getAllTypes().subscribe(data => {
      this.examinationTypes = data;
    });

  }

  onSearchSubmit(selectedOption: string, selectedName: string, selectedRating: number) {
    this.isTypeSelected = true;
    if (selectedOption === 'No type') {
      this.selectedOption = 'No type';
      this.resetAllForm();
    } else {
      this.patientHomePageService.getSearchedClinics(this.realSelectedOptionById, selectedName, selectedRating).subscribe(data => {
        this.clinics = data;
      });
    }
  }

  onSelectChange($event: Event) {
    console.log(this.selectedOption);
    for (const a of this.examinationTypes) {
      if (a.name === this.selectedOption) {
        this.realSelectedOptionById = a.id;
      }
    }
    console.log('e sad ovde treba da bude id ako preuzmem preko imena' + this.realSelectedOptionById);
  }

  getDoctorFromSelectedClinic(selectedOption: string, id: string) {
    this.isAnyClinicSelected = true;
    this.selectedClinicId = id;
    this.patientHomePageService.getSearchedDoctors(this.realSelectedOptionById, id).subscribe(data => {
      this.doctors = data;
    });
    this.hiddenHeader = true;
    this.hiddenTerms = true;
    this.hiddenLabel = true;
  }

  showSendRequestButton(id: string) {
    console.log('termin je ' + this.selectedTerm);
    this.selectedDoctorId = id;
    this.hiddenSend = true;
  }

  resetAllForm() {
    this.hiddenSend = false;
    this.isTypeSelected = false;
    this.isAnyClinicSelected = false;
    this.patientHomePageService.getAllClinics().subscribe(data => {
      this.clinics = data;
    });
  }

  sendRequest(selectedType: string, selectedDate: string) {
    this.patientHomePageService.sendRequest(this.realSelectedOptionById, selectedDate, this.selectedClinicId,
      this.selectedDoctorId, this.user.id, this.selectedTerm);
    this.resetAllForm();
    this.showNotification('success', 'Request for examination has been sent! ');
    this.hiddenLabel = true;
    this.hiddenHeader = true;
    this.hiddenTerms = true;
  }

  showSearch($event: MouseEvent) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    if (this.isSearchHidden) {
      this.isSearchHidden = false;
      this.faArrow = faArrowDown;
    } else {
      this.isSearchHidden = true;
      this.faArrow = faArrowUp;
    }
  }

  showSearchDoctor($event: MouseEvent) {
    this.animationState2 = this.animationState2 === 'out' ? 'in' : 'out';
    if (this.isSearchDoctorHidden) {
      this.isSearchDoctorHidden = false;
      this.faArrow2 = faArrowDown;
    } else {
      this.isSearchDoctorHidden = true;
      this.faArrow2 = faArrowUp;
    }
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  onSearchDoctorSubmit(selectedFirstName: string, selectedLastName: string, selectedDoctorRating: number) {
    this.patientHomePageService.getSearchedDoctorsExtended(this.realSelectedOptionById,
      this.selectedClinicId, this.selectedFirstName, this.selectedLastName, this.selectedDoctorRating).subscribe(data => {
      this.doctors = data;
    });
  }

  showTerms(id: string) {
    this.patientHomePageService.getAvailableTermsForDoctor(id, this.realDateAsString).subscribe(data => {
      this.availableTerms = data;
      this.hiddenHeader = false;
      if (this.availableTerms.length === 0) {
        this.hiddenLabel = false;
      } else {
        this.hiddenTerms = false;
      }
    });
  }

  dateChanged($event: Event) {
    console.log((this.selectedDate));
    this.realDateAsString = this.datePipe.transform(this.selectedDate, 'yyyy_MM_dd');
    console.log(this.realDateAsString);
  }

  parseDate(dateString: Date): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
