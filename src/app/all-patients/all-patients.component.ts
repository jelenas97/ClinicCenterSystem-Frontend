import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user';
import {AllPatientsService} from './all-patients.service';
import {
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {
  patients: User[] = [];
  selectedFirstName: string;
  selectedLastName: string;
  selectedSsn: number;
  UserCircle = faUserCircle;

  constructor(private patientsService: AllPatientsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.patientsService.getAll().subscribe(data => {
      this.patients = data;
    });
  }

  onSearchSubmit(selectedFirstName: string, selectedLastName: string, selectedSsn: number) {
    this.patientsService.searchPatient(selectedFirstName, selectedLastName, selectedSsn).subscribe(data => {
      this.patients = data;
    });
  }

  showProfile(id: string) {
    this.router.navigate(['patientProfileForMedicalStaff'], { state: { example: id } });

  }
}
