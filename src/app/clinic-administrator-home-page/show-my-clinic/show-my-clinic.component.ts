import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {Clinic} from '../../model/clinic';
import {ShowMyClinicService} from './show-my-clinic.service';

@Component({
  selector: 'app-show-my-clinic',
  templateUrl: './show-my-clinic.component.html',
  styleUrls: ['./show-my-clinic.component.css']
})
export class ShowMyClinicComponent implements OnInit {

  user: User;
  clinic: Clinic;

  constructor(private showMyClinicService: ShowMyClinicService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    console.log('afdasfasf' + this.user.id);
    this.showMyClinicService.getClinic(this.user.id).subscribe(data => {
      this.clinic = data;
    });
  }

}
