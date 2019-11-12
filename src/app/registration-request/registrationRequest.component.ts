import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from '../model/registrationRequest';
import {RegistrationRequestService} from './registrationRequest.service';


@Component({
  templateUrl: 'registrationRequest.component.html',
  selector: 'app-registration-request'
})

export class RegistrationRequestComponent implements OnInit {

  requests: RegistrationRequest[] = [];

  constructor(private registrationRequestService: RegistrationRequestService) {
  }

  ngOnInit(): void {
    this.registrationRequestService.getAll().subscribe(data => {
      this.requests = data;
    });
  }
}
