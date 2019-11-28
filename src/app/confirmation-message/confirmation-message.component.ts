import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationMessageService} from './confirmation-message.service';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router, private confirmationMessageService: ConfirmationMessageService) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl)
    this.confirmationMessageService.activateUser('http://localhost:8080/auth' + this.currentUrl);
  }
}
