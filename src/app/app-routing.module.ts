import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {MedicamentComponent} from './medicament/medicament.component';


const routes: Routes = [{path: 'register', component: RegistrationComponent},
                        {path: 'medicament', component: MedicamentComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
