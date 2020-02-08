import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from '../model/registrationRequest';
import {RegistrationRequestService} from './registrationRequest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../service/user.service';
import {NotifierService} from 'angular-notifier';
import {User} from '../model/user';


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
  notifier: NotifierService;
  users: User[] = [];
  emails: string[] = [];
  ssns: string[] = [];

  constructor(private registrationRequestService: RegistrationRequestService, private route: ActivatedRoute, private router: Router,
              private modalService: NgbModal, private userService: UserService, private notifierService: NotifierService) {
    this.notifier = notifierService;
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

    this.userService.getAll().subscribe(data => {
      this.users = data;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.users.length; i++) {
        this.emails.push(this.users[i].email.toString());
        this.ssns.push(this.users[i].ssn.toString());
      }

      if (this.emails.includes(request.email)) {
        this.showNotification('warning', 'This email is already in use. Write mail to user');
      } else if (this.ssns.includes(request.ssn.toString())) {
        this.showNotification('warning', 'This ssn is already exist. Write mail to user');
      } else {
        this.registrationRequestService.save(request).subscribe(result => this.ngOnInit());
      }
    });

  }


  rejectRequest() {
    this.registrationRequestService.removeRequest(this.requestId, this.reason).subscribe(result => this.ngOnInit());
    console.log(this.requestId);
    this.modalService.dismissAll();
  }

  get subscriptionFormModalReason() {
    return this.validatingForm.get('subscriptionFormModalReason');
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

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
