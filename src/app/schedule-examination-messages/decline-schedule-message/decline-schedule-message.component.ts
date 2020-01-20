import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DeclineScheduleMessageService} from './decline-schedule-message.service';

@Component({
  selector: 'app-decline-schedule-message',
  templateUrl: './decline-schedule-message.component.html',
  styleUrls: ['./decline-schedule-message.component.css']
})
export class DeclineScheduleMessageComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router, private declineScheduleMessageService: DeclineScheduleMessageService) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.declineScheduleMessageService.declineExamination('http://localhost:8080/auth' + this.currentUrl);
  }

}
