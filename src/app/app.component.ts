import { Component, OnInit } from '@angular/core';
import {UserService} from './service/user.service';
import {AuthService} from './service/auth.service';
import {Observable} from 'rxjs';
import {ApiService} from './service/api.service';
import {Router} from '@angular/router';
import {
  faBookMedical,
  faClinicMedical,
  faCoffee,
  faHome, faInfo, faInfoCircle, faNotesMedical, faPrescriptionBottleAlt,
  faSign,
  faSignInAlt,
  faSignOutAlt,
  faUserAlt, faUserCircle,
  faUserPlus, faUsers
} from '@fortawesome/free-solid-svg-icons';



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

  isLoggedIn: Observable<boolean>;

  constructor( private apiService: ApiService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    console.log(this.role);
  }

  logout() {
    this.userService.currentUser = null;
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.ngOnInit();
  }
}
