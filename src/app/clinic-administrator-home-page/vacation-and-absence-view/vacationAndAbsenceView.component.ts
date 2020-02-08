import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vacation} from '../../model/vacation';
import {VacationAndAbsenceViewService} from './vacationAndAbsenceView.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'vacationAndAbsenceView.component.html',
  styleUrls: ['vacationAndAbsenceView.component.css'],
})

export class VacationAndAbsenceViewComponent implements OnInit {

  requests: Vacation[] = [];
  user: User;
  validatingForm: FormGroup;
  closeResult: string;
  reason: string;
  requestId: number;

  constructor(private vacationAndAbsenceViewService: VacationAndAbsenceViewService, private route: ActivatedRoute,
              private router: Router, private userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {

    this.userService.getMyInfo();
    this.user = this.userService.currentUser;

    if (window.location.href.indexOf('vacationRequests') > -1) {
      this.vacationAndAbsenceViewService.getAllVacationRequests(this.user.id).subscribe(data => {
        this.requests = data;
      });
    } else {
      this.vacationAndAbsenceViewService.getAllAbsenceRequests(this.user.id).subscribe(data => {
        this.requests = data;
      });
    }

    this.validatingForm = new FormGroup({
      subscriptionFormModalReason: new FormControl('', Validators.required),
    });
  }

  get subscriptionFormModalReason() {
    return this.validatingForm.get('subscriptionFormModalReason');
  }

  sendApproveMailtoUser(requestVacation: Vacation, id: number): void {
    this.vacationAndAbsenceViewService.sendApproveMail(requestVacation, id).subscribe(result => this.ngOnInit());
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

  onSubmit(mymodal) {
     this.vacationAndAbsenceViewService.sendRejectMail(this.reason, this.requestId).subscribe(result => this.ngOnInit());
     this.modalService.dismissAll();
  }

  openModal(mymodal, request: Vacation) {
    this.requestId = request.id;
    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
