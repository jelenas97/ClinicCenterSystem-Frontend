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

  public chartColors3: any[] = [
    {
      backgroundColor: ['#ce4ebf']
    }];
  isData1Available = false;
  isData2Available = false;
  isData3Available = false;



  public barChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      rectangle: {
        backgroundColor: '#31ff1e'
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

  public barChartOptions2: ChartOptions = {
    responsive: true,
    elements: {
      rectangle: {
        backgroundColor: '#6FC8CE'
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

  public barChartOptions3: ChartOptions = {
    responsive: true,
    elements: {
      rectangle: {
        backgroundColor: '#ce4ebf'
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
  public barChartLabels1: Label[] = [];
  public barChartLabels2: Label[] = [];
  public barChartLabels3: Label[] = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData1: ChartDataSets[] = [];
  public barChartData2: ChartDataSets[] = [];
  public barChartData3: ChartDataSets[] = [];



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
      this.barChartLabels1.push(temp.getDate() + '.' + this.monthNameList[temp.getMonth() + 12]);
      i = i + 1;
    }
    this.barChartLabels1.reverse();
    values.reverse();
    this.barChartData1 = [
      ...this.barChartData1,
      {
        data: values,
        label: 'Exams'
      }];
  }

  private fillMonthlyChart() {
    let i = 0;
    const values = [];
    for (const monthly of this.examsMonthly) {
      const numberFor = +monthly;
      const temp = new Date();
      values.push(numberFor);
      this.barChartLabels2.push(this.monthNameList[temp.getMonth() + 12 - i]);
      i = i + 1;
    }
    this.barChartLabels2.reverse();
    values.reverse();
    this.barChartData2 = [
      ...this.barChartData2,
      {
        data: values,
        label: 'Exams'
      }];
  }

  private fillYearlyChart() {
    let i = 0;
    const values = [];
    for (const yearly of this.examsYearly) {
      const numberFor = +yearly;
      const temp = new Date();
      values.push(numberFor);
      this.barChartLabels3.push(temp.getFullYear() - i + '');
      i = i + 1;
    }
    this.barChartLabels3.reverse();
    values.reverse();
    this.barChartData3 = [
      ...this.barChartData3,
      {
        data: values,
        label: 'Exams'
      }];
  }



  ngOnInit(): void {
    this.clinicExamsService.getAllExamsDay(this.user.id).subscribe(data => {
      this.examsDaily = data;
      this.fillDailyChart();
      this.isData1Available = true;
    });
    this.clinicExamsService.getAllExamsMonth(this.user.id).subscribe(data1 => {
      this.examsMonthly = data1;
      this.fillMonthlyChart();
      this.isData2Available = true;
    });
    this.clinicExamsService.getAllExamsYear(this.user.id).subscribe(data1 => {
      this.examsYearly = data1;
      this.fillYearlyChart();
      this.isData3Available = true;
    });
    }


}
