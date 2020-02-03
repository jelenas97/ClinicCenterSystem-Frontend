import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../model/user';
import {MedicalHistory} from '../model/medicalHistory';
import {ShowMedicalHistoryService} from './showMedicalHistory.service';
import {
 faEdit
} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../service/user.service';
import {Sort} from '@angular/material/sort';


@Component({
  templateUrl: 'showMedicalHistory.component.html',
  selector: 'app-show-medical-history'
})

export class ShowMedicalHistoryComponent implements OnInit {
  medicalHistory: MedicalHistory[];
  medicalHistoryId: string;
  patient: User;
  faEdit = faEdit;
  currUser: User;
  private sortedData: MedicalHistory[];

  constructor(private showMedicalHistoryService: ShowMedicalHistoryService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.patient = new User();
  }

  ngOnInit(): void {

    this.userService.getMyInfo();
    this.currUser = this.userService.currentUser;

    this.activatedRoute.paramMap.subscribe(params => {
      this.medicalHistoryId = params.get('id');
      this.showMedicalHistoryService.getAllById(this.medicalHistoryId).subscribe(data => {
        this.medicalHistory = data;
        this.sortedData = data;
      });
    });



  }

  sortData(sort: Sort) {
    const data = this.medicalHistory.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'dateExam': return compare(a.dateExam, b.dateExam, isAsc);
        case 'doctorName': return compare(a.doctorName, b.doctorName, isAsc);
        case 'clinicName': return compare(a.clinicName, b.clinicName, isAsc);
        case 'medicament': return compare(a.medicament, b.medicament, isAsc);
        case 'diagnosis': return compare(a.diagnosis, b.diagnosis, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
