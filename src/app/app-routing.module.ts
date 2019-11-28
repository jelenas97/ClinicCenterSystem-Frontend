import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {MedicamentComponent} from './medicament/medicament.component';
import {LoginComponent} from './login/login.component';
import {RegistrationRequestComponent} from './registration-request/registrationRequest.component';
import {MoreInfoRegisterRequestComponent} from './more-info/more-info-register-request/moreInfoRegisterRequest.component';
import {MedicalStaffProfileComponent} from './medical-staff-profile/medicalStaffProfile.component';
import {EditMedicalStaffComponent} from './edit-medical-staff/editMedicalStaff.component';
import {PatientHomePageComponent} from './patient-home-page/patientHomePage.component';
import {ProfilePageComponent} from './patient-home-page/profile-page/profile-page.component';
import {AllClinicsComponent} from './patient-home-page/all-clinics/all-clinics.component';
import {ClinicComponent} from './clinic/clinic.component';
import {ConfirmationMessageComponent} from './confirmation-message/confirmation-message.component';


const routes: Routes = [{path: 'register', component: RegistrationComponent},
  {path: 'medicament', component: MedicamentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrationRequests', component: RegistrationRequestComponent},
  {path: 'medicalStaffProfile', component: MedicalStaffProfileComponent},
  {path: 'editMedicalStaff', component: EditMedicalStaffComponent},
  {path: 'registrationRequest/:id', component: MoreInfoRegisterRequestComponent},
  {path: 'activateUser/:id', component: ConfirmationMessageComponent},
  {
    path: 'patientHomePage', component: PatientHomePageComponent, children: [{
      path: 'patientProfilePage', component: ProfilePageComponent
    }, {path: 'allClinics', component: AllClinicsComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
