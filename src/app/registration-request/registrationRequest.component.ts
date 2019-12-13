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
  reason: string;

  constructor(private registrationRequestService: RegistrationRequestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.registrationRequestService.getAll().subscribe(data => {
      this.requests = data;
    });
  }

  acceptRequest(request: RegistrationRequest) {
    this.registrationRequestService.save(request).subscribe(result => this.ngOnInit());
  }

  gotoUser() {
    return this.router.navigate(['/acceptRequest']);
  }


  rejectRequest(id: number, message: string) {
    this.registrationRequestService.removeRequest(id, message).subscribe(result => this.ngOnInit());
    console.log(id);
  }

  private gotoRegistrationRequest() {
    this.router.navigate(['/registrationRequests']);
  }

}
