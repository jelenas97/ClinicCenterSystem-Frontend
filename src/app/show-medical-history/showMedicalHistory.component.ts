import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../model/user';
import {MedicalHistory} from '../model/medicalHistory';
import {ShowMedicalHistoryService} from './showMedicalHistory.service';
import {
 faEdit
} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../service/user.service';


@Component({
  templateUrl: 'showMedicalHistory.component.html',
  selector: 'app-show-medical-history'
})

export class ShowMedicalHistoryComponent implements OnInit {
  medicalHistory: MedicalHistory[];
  medicalHistoryId: string;
  patient: User;
  faEdit = faEdit;
  currUser: User;

  constructor(private showMedicalHistoryService: ShowMedicalHistoryService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.patient = new User();
  }

  ngOnInit(): void {

    this.userService.getMyInfo();
    this.currUser = this.userService.currentUser;


    this.activatedRoute.paramMap.subscribe(params => {
      this.medicalHistoryId = params.get('id');
      this.showMedicalHistoryService.getAllById(this.medicalHistoryId).subscribe(data => {
        this.medicalHistory = data;
      });
    });



  }
}
