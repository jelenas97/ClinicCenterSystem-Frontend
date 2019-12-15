import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Medicament} from '../model/medicament';
import {ShowAllMedicamentsService} from './showAllMedicaments.service';


@Component({
  templateUrl: 'showAllMedicaments.component.html',
  // tslint:disable-next-line:component-selector
  selector: 'app-showAllMedicaments'
})

export class ShowAllMedicamentsComponent implements OnInit {

  medicaments: Medicament[] = [];
  reason: string;

  constructor(private showAllMedicamentsService: ShowAllMedicamentsService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.showAllMedicamentsService.getAll().subscribe(data => {
      this.medicaments = data;
    });
  }
}
