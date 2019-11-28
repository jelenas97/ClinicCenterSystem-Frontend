import { Component, OnInit } from '@angular/core';
import {UserService} from './service/user.service';
import {AuthService} from './service/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  role = null;

  constructor(private authService: AuthService)
  {}

  ngOnInit(): void {
    console.log('ovo je rola');
    this.role = sessionStorage.getItem('role');
    console.log(this.role);

  }
}
