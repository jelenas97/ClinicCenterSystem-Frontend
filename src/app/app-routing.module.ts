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
import {DoctorHomePageComponent} from './doctor-home-page/doctor-home-page.component';
import {DoctorProfilePageComponent} from './doctor-home-page/doctor-profile-page/doctor-profile-page.component';
import {NurseHomePageComponent} from './nurse-home-page/nurseHomePage.component';

import {ClinicAdministratorHomePageComponent} from './clinic-administrator-home-page/clinic-administrator-home-page.component';
// tslint:disable-next-line:max-line-length
import {ClinicAdministratorProfilePageComponent} from './clinic-administrator-home-page/clinic-administrator-profile-page/clinic-administrator-profile-page.component';
// tslint:disable-next-line:max-line-length
import {EditClinicAdministratorComponent} from './clinic-administrator-home-page/edit-clinic-administrator/edit-clinic-administrator.component';
import {RatingsComponent} from './patient-home-page/ratings/ratings.component';
import {EditPatientProfilePageComponent} from './patient-home-page/edit-patient-profile-page/edit-patient-profile-page.component';
import {CcaHomePageComponent} from './clinic-center-administrator-home-page/ccaHomePage.component';
import {RecipesComponent} from './recipes/recipes.component';
import {ValidatedRecipesComponent} from './validated-recipes/validatedRecipes.component';
// tslint:disable-next-line:import-spacing
import {CcaProfilePageComponent} from
    './clinic-center-administrator-home-page/clinic-center-administrator-profile-page/ccaProfilePage.component';


const routes: Routes = [{path: 'register', component: RegistrationComponent},
  {path: 'medicament', component: MedicamentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrationRequests', component: RegistrationRequestComponent},
  {path: 'medicalStaffProfile', component: MedicalStaffProfileComponent},
  {path: 'newClinic', component: ClinicComponent},
  {path: 'activateUser/:id', component: ConfirmationMessageComponent},
  {path: 'nurseHomePage', component: NurseHomePageComponent},
  {path: 'ccaHomePage', component: CcaHomePageComponent},
  {path: 'ccaProfilePage', component: CcaProfilePageComponent},
  {path: 'allValidatedRecipes', component: ValidatedRecipesComponent},
  {path: 'allRecipes', component: RecipesComponent},
  {path: 'editMedicalStaff', component: EditMedicalStaffComponent},
  {path: 'registrationRequest/:id', component: MoreInfoRegisterRequestComponent},
  {path: 'patientProfilePage', component: ProfilePageComponent},
  {path: 'ratings', component: RatingsComponent},
  {path: 'allClinics', component: AllClinicsComponent},
  {path: 'patientHomePage', component: PatientHomePageComponent},
  {path: 'editPatientProfilePage', component: EditPatientProfilePageComponent},
  {path: 'doctorHomePage', component: DoctorHomePageComponent},
  {path: 'doctorProfilePage', component: DoctorProfilePageComponent},
  {path: 'clinicAdministratorHomePage', component: ClinicAdministratorHomePageComponent},
  {path: 'clinicAdministratorProfilePage', component: ClinicAdministratorProfilePageComponent},
  {path: 'editClinicAdministrator', component: EditClinicAdministratorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
