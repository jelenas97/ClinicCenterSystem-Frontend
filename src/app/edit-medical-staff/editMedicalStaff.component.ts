import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {EditMedicalStaffService} from './editMedicalStaff.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-medical-staff',
  templateUrl: './editMedicalStaff.component.html'
})
export class EditMedicalStaffComponent implements  OnInit {
  user: User;

  constructor(private editMedicalStaffService: EditMedicalStaffService, private route: ActivatedRoute, private router: Router) {
  }

  onSubmit() {
    this.editMedicalStaffService.update(this.user, 1).subscribe(result => this.gotoUser());
  }

  gotoUser() {
    this.router.navigate(['/editMedicalStaff']);
  }

  ngOnInit(): void {

    this.editMedicalStaffService.getById(1).subscribe(data => {
      this.user = data;
    });


  }
}

