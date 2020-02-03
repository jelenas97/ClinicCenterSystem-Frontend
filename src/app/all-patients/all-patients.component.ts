import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user';
import {AllPatientsService} from './all-patients.service';
import {
  faBookMedical,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {
  patients: User[] = [];
  sortedData: User[] = [];
  selectedFirstName: string;
  selectedLastName: string;
  selectedSsn: number;
  UserCircle = faUserCircle;
  faMedicalRecord = faBookMedical;
  private role: string;

  constructor(private patientsService: AllPatientsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.patientsService.getAll().subscribe(data => {
      this.patients = data;
      this.sortedData = data;

    });
  }

  onSearchSubmit(selectedFirstName: string, selectedLastName: string, selectedSsn: number) {
    this.patientsService.searchPatient(selectedFirstName, selectedLastName, selectedSsn).subscribe(data => {
      this.patients = data;
      this.sortedData = this.patients.slice();
    });
  }

  showProfile(id: string) {
    this.router.navigate(['patientProfileForMedicalStaff'], { state: { example: id } });

  }

  creatMedicalRecord(id: string) {
    this.patientsService.createMedicalRecord(id).subscribe(result => this.ngOnInit());
  }

  showMedicalRecordHistory(id: string) {
    this.patientsService.showMedicalHistory(id).subscribe();
  }

  sortData(sort: Sort) {
    const data = this.patients.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'ssn': return compare(a.ssn, b.ssn, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
