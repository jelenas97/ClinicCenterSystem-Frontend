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



@Component({
  selector: 'app-all-clinics',
  templateUrl: './all-clinics.component.html',
  styleUrls: ['./all-clinics.component.css'],
  animations: [SlideInOutAnimation]

})
export class AllClinicsComponent implements OnInit {

  notifier: NotifierService;


  faArrow = faArrowDown;
  animationState = 'out';

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

  public user: User;

  constructor(private patientHomePageService: PatientHomePageService, private router: Router, private userService: UserService,
              private notifierService: NotifierService) {
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
    console.log('Da vidim jel prezume ime : ' + this.selectedName);
    console.log('Da vidim jel preuzme rating : ' + this.selectedRating);
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
  }

  showSendRequestButton(id: string) {
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
      this.selectedDoctorId, this.user.id);
    this.resetAllForm();
    this.showNotification( 'success', 'Request for examination has been sent! ' );
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

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }
}
