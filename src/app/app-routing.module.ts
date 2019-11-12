import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {MedicamentComponent} from './medicament/medicament.component';
import {LoginComponent} from './login/login.component';
import {RegistrationRequestComponent} from './registration-request/registrationRequest.component';


const routes: Routes = [{path: 'register', component: RegistrationComponent},
                        {path: 'medicament', component: MedicamentComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'registrationRequests', component: RegistrationRequestComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
