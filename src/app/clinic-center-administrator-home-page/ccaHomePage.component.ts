import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {CcaHomePageService} from './ccaHomePage.service';


@Component({
  templateUrl: 'ccaHomePage.component.html',
  styleUrls: ['ccaHomePage.component.css'],
})

export class CcaHomePageComponent implements OnInit {

  user: User;
  constructor(private ccaHomePageService: CcaHomePageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.ccaHomePageService.getById(10).subscribe(data => {
      this.user = data;
    });
  }

}
