import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {NurseHomePageService} from './nurseHomePage.service';


@Component({
  templateUrl: 'nurseHomePage.component.html',
  styleUrls: ['nurseHomePage.component.css'],
})

export class NurseHomePageComponent implements OnInit {

  user: User;
  constructor(private nurseHomePageService: NurseHomePageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.nurseHomePageService.getById(4).subscribe(data => {
      this.user = data;
    });
  }

}
