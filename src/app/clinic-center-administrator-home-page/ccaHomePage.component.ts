import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CcaHomePageService} from './ccaHomePage.service';
import {UserService} from '../service/user.service';
import {Observable} from 'rxjs';


@Component({
  templateUrl: 'ccaHomePage.component.html',
  styleUrls: ['ccaHomePage.component.css'],
})

export class CcaHomePageComponent implements OnInit {

  user: Observable<any>;
  constructor(private ccaHomePageService: CcaHomePageService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getMyInfo();
  }

}
