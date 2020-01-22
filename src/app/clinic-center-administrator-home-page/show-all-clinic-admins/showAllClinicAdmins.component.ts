import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClinicAdmin} from '../../model/clinicAdmin';
import {ShowAllClinicAdminsService} from './showAllClinicAdmins.service';


@Component({
  selector: 'app-show-all-clinic-admins',
  templateUrl: './showAllClinicAdmins.component.html',
  styleUrls: ['./showAllClinicAdmins.component.css']
})
export class ShowAllClinicAdminsComponent implements OnInit {
  admins: ClinicAdmin[] = [];

  constructor(private showAllClinicAdminsService: ShowAllClinicAdminsService) {
  }

  ngOnInit(): void {
    this.showAllClinicAdminsService.getAll().subscribe(data => {
      this.admins = data;
    });
  }

  removeClinicAdmin(id: number) {
    this.showAllClinicAdminsService.removeClinicAdmin(id).subscribe(data => this.ngOnInit());
  }
}
