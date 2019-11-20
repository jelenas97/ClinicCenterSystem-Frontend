import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Clinic} from '../model/clinic';
import {ClinicService} from './clinic.service';


@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent {
  clinic: Clinic;

  constructor(private clinicService: ClinicService, private route: ActivatedRoute, private router: Router) {
    this.clinic = new Clinic();
  }

  onSubmit() {
    this.clinicService.save(this.clinic).subscribe(result => this.gotoClinic());
  }

  gotoClinic() {
    this.router.navigate(['/createClinic']);
  }
}
