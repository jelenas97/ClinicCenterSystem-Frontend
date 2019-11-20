import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from '../model/registrationRequest';
import {RegistrationRequestService} from './registrationRequest.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  templateUrl: 'registrationRequest.component.html',
  selector: 'app-registration-request'
})

export class RegistrationRequestComponent implements OnInit {

  requests: RegistrationRequest[] = [];

  constructor(private registrationRequestService: RegistrationRequestService , private router: Router) {
  }

  ngOnInit(): void {
    this.registrationRequestService.getAll().subscribe(data => {
      this.requests = data;
    });
  }


  rejectRequest(id: number) {
    this.registrationRequestService.removeRequest(id).subscribe(result => this.gotoRegistrationRequest());
    console.log(id);
  }

  private gotoRegistrationRequest() {
    this.router.navigate(['/registrationRequests']);
  }
}
