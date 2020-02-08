import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {endOfDay, isSameDay, isSameMonth, startOfDay} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {WorkCalendarService} from './workCalendar.service';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {MedicalExamination} from '../model/medicalExamination';
import {Router} from '@angular/router';
import {MedicalOperation} from '../model/medicalOperation';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-work-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./workCalendar.component.css'],
  templateUrl: './workCalendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class WorkCalendarComponent implements OnInit {

  private user: User;
  private exams: MedicalExamination[] = [];
  private operations: MedicalOperation[] = [];


  constructor(private modal: NgbModal, private workCalendarService: WorkCalendarService,
              private userService: UserService, private router: Router) {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
  }

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  faPrevious = faArrowLeft;
  faNext = faArrowRight;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent [] = [];

  activeDayIsOpen = true;

  fillCalendar(): void {
    for (const exam of this.exams) {
      if (exam.confirmed) {
        // @ts-ignore
        const datum = new Date(exam.date + 30 * 60 * 1000);
        this.events = [
          ...this.events,
          {
            title: exam.type.name + ' ' + exam.patient.firstName + ' ' + exam.patient.lastName,
            start: new Date(exam.date),
            end: datum,
            color: colors.red,
            id: exam.id,
          }
        ];
      }
    }

  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const start = new Date(event.start.getTime() - 15 * 60 * 1000);
    const end = new Date(event.end.getTime() + 15 * 60 * 1000);
    const now = new Date();
    if (event.color === colors.red && start < now && now < end) {
      this.router.navigate(['/startExam/' + event.id]);
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.workCalendarService.getAllExams(this.user.id).subscribe(data => {
      this.exams = data;
      this.refresh.next();
      this.fillCalendar();

    });
    this.workCalendarService.getAllOperation(this.user.id).subscribe(data => {
      this.operations = data;
      this.refresh.next();
      this.fillCalendarOperation();

    });

  }


  private fillCalendarOperation() {

    for (const operation of this.operations) {
      // @ts-ignore
      const datum = new Date(operation.date + 30 * 60 * 1000);
      this.events = [
        ...this.events,
        {
          title: 'Operation for ' + operation.patient.firstName + ' ' + operation.patient.lastName,
          start: (new Date(operation.date)),
          end: (datum),
          color: colors.blue,
        }
      ];
    }
  }
}
