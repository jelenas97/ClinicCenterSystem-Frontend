import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {PatientHomePageService} from '../patientHomePage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User;

  constructor(private patientHomePageService: PatientHomePageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.patientHomePageService.getById(1).subscribe(data => {
      this.user = data;
    });
  }

}
