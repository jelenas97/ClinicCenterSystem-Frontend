import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {MedicamentComponent} from './medicament/medicament.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [{path: 'register', component: RegistrationComponent},
                        {path: 'medicament', component: MedicamentComponent},
                        {path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
