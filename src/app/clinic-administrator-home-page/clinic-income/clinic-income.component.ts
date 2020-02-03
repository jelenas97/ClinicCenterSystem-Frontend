import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClinicIncomeService} from './clinic-income.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-clinic-income',
  templateUrl: './clinic-income.component.html',
  styleUrls: ['./clinic-income.component.css']
})

export class ClinicIncomeComponent implements OnInit {

  user: User;
  day: any;
  days: any;
  month: any;
  threeMonths: any;
  sixMonths: any;
  year: any;
  private incomes: number[];

  constructor(private clinicIncomeService: ClinicIncomeService, private userService: UserService,
              private route: ActivatedRoute, private router: Router) {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
  }

  ngOnInit(): void {
    this.clinicIncomeService.getAllIncome(this.user.id).subscribe(data => {
      this.incomes = data;
      this.day = this.incomes[0];
      this.days = this.incomes[1];
      this.month = this.incomes[2];
      this.threeMonths = this.incomes[3];
      this.sixMonths = this.incomes[4];
      this.year = this.incomes[5];
    });  }

}
