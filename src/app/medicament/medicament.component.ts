import {Component, OnInit} from '@angular/core';
import {Medicament} from '../model/medicament';
import {MedicamentService} from './medicament.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css']
})
export class MedicamentComponent {
  medicament: Medicament;

  constructor(private medicamentService: MedicamentService, private route: ActivatedRoute, private router: Router) {
    this.medicament = new Medicament();
  }

  onSubmit() {
    this.medicamentService.save(this.medicament).subscribe(result => this.gotoMedicament());
  }

  gotoMedicament() {
    this.router.navigate(['/allMedicaments']);
  }
}
