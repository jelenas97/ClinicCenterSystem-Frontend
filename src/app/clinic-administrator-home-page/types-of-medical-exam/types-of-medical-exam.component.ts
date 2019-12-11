import {Component, OnInit} from '@angular/core';
import {TypeOfMedicalExam} from '../../model/typeOfMedicalExam';
import {RegistrationRequestService} from '../../registration-request/registrationRequest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TypesOfMedicalExamService} from './types-of-medical-exam.service';

@Component({
  selector: 'app-types-of-medical-exam',
  templateUrl: './types-of-medical-exam.component.html',
  styleUrls: ['./types-of-medical-exam.component.css']
})
export class TypesOfMedicalExamComponent implements OnInit {
  types: TypeOfMedicalExam[] = [];

  constructor(private typesOfMedicalExamService: TypesOfMedicalExamService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.typesOfMedicalExamService.getAll().subscribe(data => {
      this.types = data;
    });
  }

  editType(type: any) {
    console.log(type);
  }

  removeType(type: any) {

  }

  changeName(type: TypeOfMedicalExam, event: any) {
    type.name = event.target.textContent;
  }

  changeprice(type: TypeOfMedicalExam, event: any) {
    type.price = event.target.textContent;
  }
}
