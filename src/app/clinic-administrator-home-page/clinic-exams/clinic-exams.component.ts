import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {MedicalExamination} from '../../model/medicalExamination';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {endOfDay, isSameDay, isSameMonth, startOfDay} from 'date-fns';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {RoomOccupationCalendarService} from '../room-occupation-calendar/room-occupation-calendar.service';
import {ClinicExamsService} from './clinic-exams.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';



@Component({
  selector: 'app-clinic-exams',
  styleUrls: ['./clinic-exams.component.css'],
  templateUrl: './clinic-exams.component.html',
})
export class ClinicExamsComponent implements OnInit {

  user: User;
  date = new Date();
  examsMonthly = [];
  examsDaily = [];
  examsYearly = [];
  numberFor: number;
  chart: google.visualization.ColumnChart;



  title = 'Graphic display of medical exams on daily level';
  title2 = 'Graphic display of medical exams on monthly level';
  type = 'ColumnChart';
  monthNameList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  public chartColors: any[] = [
    {
      backgroundColor: ['#31ff1e']
    }];

  public chartColors2: any[] = [
    {
      backgroundColor: ['#6FC8CE']
    }];
  isDataAvailable = false;

  public barChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      rectangle: {
        backgroundColor: 'blue'
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
  ];


  constructor(private modal: NgbModal, private userService: UserService, private router: Router,
              private clinicExamsService: ClinicExamsService) {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;


  }


  private fillDailyChart() {
    let i = 0;
    const values = [];
    for (const daily of this.examsDaily) {
      const numberFor = +daily;
      const temp = new Date();
      values.push(numberFor);
      temp.setDate(temp.getDate() - i);
      this.barChartLabels.push(temp.getDate() + '.' + this.monthNameList[temp.getMonth() + 12]);
      i = i + 1;
    }
    this.barChartLabels.reverse();
    values.reverse();
    this.barChartData = [
      ...this.barChartData,
      {
        data: values,
        label: 'Exams'
      }];
    console.log(this.barChartData);
  }



  ngOnInit(): void {
    this.clinicExamsService.getAllExamsDay(this.user.id).subscribe(data => {
      this.examsDaily = data;
      this.fillDailyChart();
      this.isDataAvailable = true;
      console.log(this.examsDaily);
      console.log(this.isDataAvailable);


    });
  }
}
