import {Component, OnInit} from '@angular/core';
import {Medicament} from '../model/medicament';
import {MedicamentService} from './medicament.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css']
})
export class MedicamentComponent implements OnInit {
  medicament: Medicament;
  medicaments: Medicament[] = [];

  constructor(private medicamentService: MedicamentService, private route: ActivatedRoute,
              private router: Router) {
    this.medicament = new Medicament();
    this.medicament.onPrescription = false;
  }

  onSubmit() {
    this.medicamentService.save(this.medicament).subscribe(result => this.ngOnInit());
  }

  ngOnInit(): void {
    this.medicamentService.getAll().subscribe(data => {
      this.medicaments = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.medicaments.length; i++) {
        if (this.medicaments[i].onPrescription === true) {
          this.medicaments[i].onPrescriptionWord = 'Yes';
        } else {
          this.medicaments[i].onPrescriptionWord = 'No';

        }
      }
    });
  }
}
