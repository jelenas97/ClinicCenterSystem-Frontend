import { Component, OnInit } from '@angular/core';
import {UserService} from './service/user.service';
import {Observable} from 'rxjs';
import {ApiService} from './service/api.service';
import {Router} from '@angular/router';
import {
  faBookMedical,
  faClinicMedical, faClipboardList,
  faExternalLinkAlt,
  faHome, faInfoCircle, faNotesMedical, faPlaneDeparture, faPlusSquare, faPrescriptionBottleAlt,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
  faUserPlus, faUsers, faUsersCog
} from '@fortawesome/free-solid-svg-icons';
import {VacationAndAbsenceViewService} from './clinic-administrator-home-page/vacation-and-absence-view/vacationAndAbsenceView.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  role = null;
  faSignOut = faSignOutAlt;
  faRegister = faUserPlus;
  faLogin = faSignInAlt;
  faHome = faHome;
  faInfo = faInfoCircle;
  faClinics = faClinicMedical;
  faPatients = faUsers;
  faPrescription = faPrescriptionBottleAlt;
  faUserCircle = faUserCircle;
  faBook = faBookMedical;
  faRecord = faNotesMedical;
  faSchedule = faClipboardList;
  faStartExam = faExternalLinkAlt;
  faAdmins = faUsersCog;
  faMedicament = faPlusSquare;
  faAnnualLeave = faPlaneDeparture;

  constructor( private apiService: ApiService, private userService: UserService, private router: Router,
               private vacationAndAbsenceViewService: VacationAndAbsenceViewService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    console.log(this.role);
  }

  logout() {
    this.userService.currentUser = null;
    localStorage.clear();
    this.router.navigate(['/login']);
    this.ngOnInit();
  }
}
