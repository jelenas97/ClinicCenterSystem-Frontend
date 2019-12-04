import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration/registration.component';
import {RegistrationService} from './registration/registration.service';
import {HttpClientModule} from '@angular/common/http';
import {MedicamentComponent} from './medicament/medicament.component';
import {MedicamentService} from './medicament/medicament.service';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {RegistrationRequestComponent} from './registration-request/registrationRequest.component';
import {RegistrationRequestService} from './registration-request/registrationRequest.service';
import {MedicalStaffProfileService} from './medical-staff-profile/medicalStaffProfile.service';
import {MedicalStaffProfileComponent} from './medical-staff-profile/medicalStaffProfile.component';
import {EditMedicalStaffComponent} from './edit-medical-staff/editMedicalStaff.component';
import {EditMedicalStaffService} from './edit-medical-staff/editMedicalStaff.service';
import {MoreInfoRegisterRequestComponent} from './more-info/more-info-register-request/moreInfoRegisterRequest.component';
import {MoreInfoRegisterRequestService} from './more-info/more-info-register-request/moreInfoRegisterRequest.service';
import {PatientHomePageComponent} from './patient-home-page/patientHomePage.component';
import {PatientHomePageService} from './patient-home-page/patientHomePage.service';
import { ProfilePageComponent } from './patient-home-page/profile-page/profile-page.component';
import { AllClinicsComponent } from './patient-home-page/all-clinics/all-clinics.component';
import {ClinicComponent} from './clinic/clinic.component';
import {ClinicService} from './clinic/clinic.service';
import {AuthService} from './service/auth.service';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';
import {ConfirmationMessageService} from './confirmation-message/confirmation-message.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { DoctorHomePageComponent } from './doctor-home-page/doctor-home-page.component';
import { DoctorProfilePageComponent } from './doctor-home-page/doctor-profile-page/doctor-profile-page.component';
import { DoctorProfilePageService } from './doctor-home-page/doctor-profile-page/doctor-profile-page.service';
import { ClinicAdministratorHomePageComponent } from './clinic-administrator-home-page/clinic-administrator-home-page.component';
// tslint:disable-next-line:max-line-length
import { ClinicAdministratorProfilePageComponent } from './clinic-administrator-home-page/clinic-administrator-profile-page/clinic-administrator-profile-page.component';
// tslint:disable-next-line:max-line-length
import { EditClinicAdministratorComponent } from './clinic-administrator-home-page/edit-clinic-administrator/edit-clinic-administrator.component';
import {EditClinicAdministrator} from './clinic-administrator-home-page/edit-clinic-administrator/edit-clinic-administrator.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MedicamentComponent,
    LoginComponent,
    RegistrationRequestComponent,
    MedicalStaffProfileComponent,
    EditMedicalStaffComponent,
    MoreInfoRegisterRequestComponent,
    RegistrationRequestComponent,
    MedicalStaffProfileComponent,
    ClinicComponent,
    MedicalStaffProfileComponent,
    PatientHomePageComponent,
    ProfilePageComponent,
    AllClinicsComponent,
    ConfirmationMessageComponent,
    DoctorHomePageComponent,
    DoctorProfilePageComponent,
    ClinicAdministratorHomePageComponent,
    ClinicAdministratorProfilePageComponent,
    EditClinicAdministratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    RegistrationService, MedicamentService, LoginService, RegistrationRequestService,
    MedicalStaffProfileService, EditMedicalStaffService, MoreInfoRegisterRequestService, ClinicService, AuthService,
    PatientHomePageService,  ConfirmationMessageService, DoctorProfilePageService, EditClinicAdministrator],
  bootstrap: [AppComponent],
})
export class AppModule { }
