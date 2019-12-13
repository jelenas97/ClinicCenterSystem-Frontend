import { Component, OnInit } from '@angular/core';
import {TypeOfMedicalExam} from '../../model/typeOfMedicalExam';
import {ActivatedRoute, Router} from '@angular/router';
import {AddTypeOfMedicalExamService} from './add-type-of-medical-exam.service';
import {User} from '../../model/user';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-add-type-of-medical-exam',
  templateUrl: './add-type-of-medical-exam.component.html',
  styleUrls: ['./add-type-of-medical-exam.component.css']
})
export class AddTypeOfMedicalExamComponent implements OnInit {
  type: TypeOfMedicalExam;

  constructor(private addTypeOfMedicalExamService: AddTypeOfMedicalExamService, private route: ActivatedRoute, private router: Router) {
    this.type = new TypeOfMedicalExam();


  }

  ngOnInit() {

  }

  addType() {
    console.log(this.type);
    this.addTypeOfMedicalExamService.addType(this.type).subscribe(data => {
      this.router.navigate(['/clinicAdministratorHomePage/typesOfMedicalExam']);
    });

  }
}
