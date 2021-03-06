import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {endOfDay, isSameDay, isSameMonth, startOfDay} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {MedicalExamination} from '../../model/medicalExamination';
import {RoomOccupationCalendarService} from './room-occupation-calendar.service';
import {MedicalOperation} from '../../model/medicalOperation';


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
  selector: 'app-room-occupation-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./room-occupation-calendar.component.css'],
  templateUrl: './room-occupation-calendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RoomOccupationCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  faPrevious = faArrowLeft;
  faNext = faArrowRight;
  view: CalendarView = CalendarView.Month;
  exams: MedicalExamination[] = [];
  operations: MedicalOperation[] = [];
  roomid: number;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [

  ];


  activeDayIsOpen = true;

  fillCalendarExam(): void {
    for (const exam of this.exams) {
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

  constructor(private modal: NgbModal, private router: Router, private roomOccupationCalendarService: RoomOccupationCalendarService) {
    this.roomid = this.router.getCurrentNavigation().extras.state.example;


  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  private fillCalendarOperations() {

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

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

   ngOnInit(): void {
     if (this.router.url.includes('Exam')) {
       this.roomOccupationCalendarService.getAllExams(this.roomid).subscribe(data => {
         this.exams = data;
         this.refresh.next();
         this.fillCalendarExam();

       });
     } else {
       this.roomOccupationCalendarService.getAllOperations(this.roomid).subscribe(data => {
         this.operations = data;
         this.refresh.next();
         this.fillCalendarOperations();
       });
     }
   }
}
