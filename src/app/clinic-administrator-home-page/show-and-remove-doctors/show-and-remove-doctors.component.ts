import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {ShowAndRemoveDoctorsService} from './show-and-remove-doctors.service';

@Component({
  selector: 'app-show-and-remove-doctors',
  templateUrl: './show-and-remove-doctors.component.html',
  styleUrls: ['./show-and-remove-doctors.component.css']
})
export class ShowAndRemoveDoctorsComponent implements OnInit {

  doctors: User[];

  constructor(private showAndRemoveDoctorsService: ShowAndRemoveDoctorsService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.showAndRemoveDoctorsService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  removeDoctor(id: string) {
    this.showAndRemoveDoctorsService.removeDoctor(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}
