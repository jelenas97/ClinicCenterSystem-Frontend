import {Component, OnInit} from '@angular/core';
import {Medicament} from '../model/medicament';
import {MedicamentService} from './medicament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DisplayMessage} from '../shared/models/display-message';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css']
})
export class MedicamentComponent implements OnInit {
  medicament: Medicament;
  medicaments: Medicament[] = [];
  userData: FormGroup;
  medicamentIds: string[] = [];
  notification: DisplayMessage;
  notifier: NotifierService;


  constructor(private medicamentService: MedicamentService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private notifierService: NotifierService) {
    this.notifier = notifierService;
    this.medicament = new Medicament();
    this.medicament.onPrescription = false;
  }

  onSubmit() {
    this.medicamentService.getAll().subscribe(data => {
      this.medicaments = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.medicaments.length; i++) {
        this.medicamentIds.push(this.medicaments[i].code.toString());
      }
      if (this.medicamentIds.includes(this.medicament.code.toString())) {
        this.showNotification('warning', 'This medicament code is already exists!');
      } else {
        this.medicamentService.save(this.medicament).subscribe(result => this.ngOnInit());
      }
    });


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
    this.userData = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(4)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      purpose: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]]
    });
  }

  get f() {
    return this.userData.controls;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
