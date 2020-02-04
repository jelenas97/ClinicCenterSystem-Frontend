import {Component, OnInit} from '@angular/core';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnualLeaveAndAbsenceService} from './annualLeaveAndAbsence.service';
import {Vacation} from '../model/vacation';
import {UserService} from '../service/user.service';
import {ModalDismissReasons, NgbDatepickerConfig, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
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

  todayDate: any;
  minDate = undefined;

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.currentUser = this.userService.currentUser;
  }

  constructor(private annualLeaveAndAbsenceService: AnnualLeaveAndAbsenceService, private route: ActivatedRoute,
              private router: Router, private userService: UserService, private modalService: NgbModal,
              private config: NgbDatepickerConfig) {
    this.vacation = new Vacation();
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    this.todayDate = new Date();
    this.minDate = {
      year: this.todayDate.getFullYear(),
      month: this.todayDate.getMonth() + 1,
      day: this.todayDate.getDate()
    };
  }

  onSubmit(mymodal) {
    this.userService.getMyInfo();
    this.currentUser = this.userService.currentUser;
    this.vacation.reason = this.reason;
    const date1 = moment(this.leaveDate).format('YYYY-MM-DD');
    const date2 = moment(this.returnDate).format('YYYY-MM-DD');
    this.date = new Date(date1);
    this.dateSec = new Date(date2);
    this.date.setMonth(this.date.getMonth() - 1);
    this.dateSec.setMonth(this.dateSec.getMonth() - 1);
    this.vacation.userId = this.currentUser.id;
    this.vacation.leaveDate = this.date;
    this.vacation.returnDate = this.dateSec;
    this.vacation.userRole = sessionStorage.getItem('role');
    if (this.type === 'vacation') {
      this.annualLeaveAndAbsenceService.saveAnnualLeave(this.vacation).subscribe(result => this.gotoAnnualLeave());
    } else if (this.type === 'absence') {
      this.annualLeaveAndAbsenceService.saveAbsence(this.vacation).subscribe(result => this.gotoAbsence());
    }

    this.modalService.open(mymodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  gotoAnnualLeave() {
    this.router.navigate(['/vacation']);
  }

  gotoAbsence() {
    this.router.navigate(['/vacation']);
  }

  onItemChange(value: any) {
    this.type = value.target.value;
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
