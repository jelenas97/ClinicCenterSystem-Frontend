import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {ShowAndRemoveDoctorsService} from './show-and-remove-doctors.service';
import {UserService} from '../../service/user.service';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {SlideInOutAnimation} from '../../patient-home-page/all-clinics/animations';

@Component({
  selector: 'app-show-and-remove-doctors',
  templateUrl: './show-and-remove-doctors.component.html',
  styleUrls: ['./show-and-remove-doctors.component.css'],
  animations: [SlideInOutAnimation]

})
export class ShowAndRemoveDoctorsComponent implements OnInit {

  doctors: User[];
  loggedUser: User;
  selectedFirstName: string;
  selectedLastName: string;
  selectedDoctorRating: number;
  faArrow = faArrowDown;
  animationState = 'out';
  isSearchHidden = false;


  constructor(private showAndRemoveDoctorsService: ShowAndRemoveDoctorsService, private route: ActivatedRoute,
              private router: Router, private userService: UserService) {
    this.loggedUser = new User();
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    console.log('ovo je logovan korisnik i prikazujem kad stisnem show all' + this.loggedUser.firstName);
    this.showAndRemoveDoctorsService.getDoctors(this.loggedUser.id).subscribe(data => {
      this.doctors = data;
      this.hasExam();
    });
  }

  hasExam() {
    for (const doctor of this.doctors) {
      this.showAndRemoveDoctorsService.hasExam(doctor.id).subscribe(data => {
        doctor.hasExam = data;
      });
    }
  }

  removeDoctor(id: string) {
    this.showAndRemoveDoctorsService.removeDoctor(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  showSearchDoctor($event: MouseEvent) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    if (this.isSearchHidden) {
      this.isSearchHidden = false;
      this.faArrow = faArrowDown;
    } else {
      this.isSearchHidden = true;
      this.faArrow = faArrowUp;
    }
  }

  onSearchDoctorSubmit(selectedFirstName: string, selectedLastName: string, selectedDoctorRating: number) {
    this.showAndRemoveDoctorsService.getSearchedDoctorsExtended(this.loggedUser.id, this.selectedFirstName, this.selectedLastName,
      this.selectedDoctorRating).subscribe(data => {
      this.doctors = data;
    });
  }
}
