import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from '../../model/registrationRequest';
import {MoreInfoRegisterRequestService} from './moreInfoRegisterRequest.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: 'moreInfoRegisterRequest.component.html',
  selector: 'app-more-info-register-request'
})

export class MoreInfoRegisterRequestComponent implements OnInit {

  request: RegistrationRequest;
  requestId: string;

  constructor(private moreInfoService: MoreInfoRegisterRequestService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.requestId = params.get('id');
    });

    this.moreInfoService.getById(+this.requestId).subscribe(data => {
      this.request = data;
    });


    console.log(this.requestId);
  }
}
