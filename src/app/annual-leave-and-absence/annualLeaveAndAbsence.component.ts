import {Component, OnInit} from '@angular/core';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnualLeaveAndAbsenceService} from './annualLeaveAndAbsence.service';
import {Vacation} from '../model/vacation';
import {UserService} from '../service/user.service';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-annual-leave-and-absence',
  templateUrl: './annualLeaveAndAbsence.component.html',
  styleUrls: ['./annualLeaveAndAbsence.component.css']
})
export class AnnualLeaveAndAbsenceComponent implements OnInit {
  faCalendar = faCalendar;
  leaveDate: string;
  returnDate: string;
  reason: string;
  absenceRadio: boolean;
  type: string;
  vacation: Vacation;
  currentUser;
  vacationRadio: boolean;
  closeResult: string;
  modalOptions: NgbModalOptions;
  date: Date;
  dateSec: Date;

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.currentUser = this.userService.currentUser;
  }

  constructor(private annualLeaveAndAbsenceService: AnnualLeaveAndAbsenceService, private route: ActivatedRoute,
              private router: Router, private userService: UserService, private modalService: NgbModal) {
    this.vacation = new Vacation();
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  onSubmit(mymodal) {

  this.userService.getMyInfo();
  this.currentUser = this.userService.currentUser;

  const date1 = moment(this.leaveDate).format('YYYY-MM-DD');
  const date2 = moment(this.returnDate).format('YYYY-MM-DD');

  this.date = new Date(date1);
  this.dateSec = new Date(date2);
  this.date.setMonth(this.date.getMonth() - 1);
  this.dateSec.setMonth(this.dateSec.getMonth() - 1);

  this.vacation.userId = this.currentUser.id;
  this.vacation.reason = this.reason;
  this.vacation.leaveDate = this.date;
  this.vacation.returnDate = this.dateSec;

  this.vacation.userRole = sessionStorage.getItem('role');
  this.annualLeaveAndAbsenceService.saveVacation(this.vacation).subscribe(result => this.gotoVacation());

  this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  gotoVacation() {
    this.router.navigate(['/vacation']);
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
