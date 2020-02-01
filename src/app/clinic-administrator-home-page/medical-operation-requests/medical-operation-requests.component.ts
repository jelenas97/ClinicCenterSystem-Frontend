import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {MedicalOperationRequestsService} from './medical-operation-requests.service';
import {User} from '../../model/user';
import {MedicalOperationRequest} from '../../model/medicalOperationRequest';

@Component({
  selector: 'app-medical-operation-requests',
  templateUrl: './medical-operation-requests.component.html',
  styleUrls: ['./medical-operation-requests.component.css']
})
export class MedicalOperationRequestsComponent implements OnInit {

  loggedUser: User;
  medicalOperationRequests: MedicalOperationRequest[];

  constructor(private medicalOperationRequestsService: MedicalOperationRequestsService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.medicalOperationRequestsService.getAllRequests(this.loggedUser.id).subscribe(data => {
      this.medicalOperationRequests = data;
    });
  }

  schedule(request: MedicalOperationRequest) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        request: request.id
      }
    };
    this.router.navigate(['scheduleOperation'], navigationExtras);
  }
}
