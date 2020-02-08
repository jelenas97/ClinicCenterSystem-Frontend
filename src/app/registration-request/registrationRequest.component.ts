import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from '../model/registrationRequest';
import {RegistrationRequestService} from './registrationRequest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  templateUrl: 'registrationRequest.component.html',
  selector: 'app-registration-request'
})

export class RegistrationRequestComponent implements OnInit {

  requests: RegistrationRequest[] = [];
  reason: string;
  validatingForm: FormGroup;
  requestId: number;
  closeResult: string;

  constructor(private registrationRequestService: RegistrationRequestService, private route: ActivatedRoute, private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.registrationRequestService.getAll().subscribe(data => {
      this.requests = data;
    });

    this.validatingForm = new FormGroup({
      subscriptionFormModalReason: new FormControl('', Validators.required),
    });
  }

  acceptRequest(request: RegistrationRequest) {
    console.log(request.email);
    this.registrationRequestService.save(request).subscribe(result => this.ngOnInit());
  }


  rejectRequest() {
    this.registrationRequestService.removeRequest(this.requestId, this.reason).subscribe(result => this.ngOnInit());
    console.log(this.requestId);
    this.modalService.dismissAll();
  }

  private gotoRegistrationRequest() {
    this.router.navigate(['/registrationRequests']);
  }

  get subscriptionFormModalReason() {
    return this.validatingForm.get('subscriptionFormModalReason');
  }

  onSubmit(mymodal) {

  }

  openModal(mymodal, id: number) {
    this.requestId = id;
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
