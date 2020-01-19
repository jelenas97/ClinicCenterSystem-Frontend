import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationScheduleMessageService} from './confirmation-schedule-message.service';

@Component({
  selector: 'app-confirmation-schedule-message',
  templateUrl: './confirmation-schedule-message.component.html',
  styleUrls: ['./confirmation-schedule-message.component.css']
})
export class ConfirmationScheduleMessageComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router, private confirmationScheduleMessageService: ConfirmationScheduleMessageService) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.confirmationScheduleMessageService.confirmExamination('http://localhost:8080/auth' + this.currentUrl);
  }

}
