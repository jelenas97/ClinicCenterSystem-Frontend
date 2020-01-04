import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngb-modal';
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
import {NurseHomePageComponent} from './nurse-home-page/nurseHomePage.component';
import {NurseHomePageService} from './nurse-home-page/nurseHomePage.service';
// @ts-ignore
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ClinicAdministratorHomePageComponent } from './clinic-administrator-home-page/clinic-administrator-home-page.component';
// tslint:disable-next-line:max-line-length
import { ClinicAdministratorProfilePageComponent } from './clinic-administrator-home-page/clinic-administrator-profile-page/clinic-administrator-profile-page.component';
// tslint:disable-next-line:max-line-length
import { EditClinicAdministratorComponent } from './clinic-administrator-home-page/edit-clinic-administrator/edit-clinic-administrator.component';
import {EditClinicAdministrator} from './clinic-administrator-home-page/edit-clinic-administrator/edit-clinic-administrator.service';
import { RatingsComponent } from './patient-home-page/ratings/ratings.component';
import { EditPatientProfilePageComponent } from './patient-home-page/edit-patient-profile-page/edit-patient-profile-page.component';
import {EditPatientProfilePageService} from './patient-home-page/edit-patient-profile-page/edit-patient-profile-page.service';
import { ScheduleExamComponent } from './patient-home-page/schedule-exam/schedule-exam.component';
import {TypesOfMedicalExamComponent} from './clinic-administrator-home-page/types-of-medical-exam/types-of-medical-exam.component';
import {TypesOfMedicalExamService} from './clinic-administrator-home-page/types-of-medical-exam/types-of-medical-exam.service';
import {AddTypeOfMedicalExamComponent} from './clinic-administrator-home-page/add-type-of-medical-exam/add-type-of-medical-exam.component';
import {AddTypeOfMedicalExamService} from './clinic-administrator-home-page/add-type-of-medical-exam/add-type-of-medical-exam.service';
import {CcaHomePageComponent} from './clinic-center-administrator-home-page/ccaHomePage.component';
import {CcaHomePageService} from './clinic-center-administrator-home-page/ccaHomePage.service';
import {RecipesService} from './recipes/recipes.service';
import {RecipesComponent} from './recipes/recipes.component';
import {ValidatedRecipesComponent} from './validated-recipes/validatedRecipes.component';
import {ValidatedRecipesService} from './validated-recipes/validatedRecipes.service';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
// tslint:disable-next-line:import-spacing
import {CcaProfilePageComponent} from
    './clinic-center-administrator-home-page/clinic-center-administrator-profile-page/ccaProfilePage.component';
// tslint:disable-next-line:import-spacing
import {CcaProfilePageService} from
    './clinic-center-administrator-home-page/clinic-center-administrator-profile-page/ccaProfilePage.service';
import {ShowAllMedicamentsComponent} from './showAllMedicaments/showAllMedicaments.component';
import {ShowAllMedicamentsService} from './showAllMedicaments/showAllMedicaments.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AnnualLeaveAndAbsenceComponent} from './annual-leave-and-absence/annualLeaveAndAbsence.component';
import {AnnualLeaveAndAbsenceService} from './annual-leave-and-absence/annualLeaveAndAbsence.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, NativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {VacationAndAbsenceViewComponent} from './clinic-administrator-home-page/vacation-and-absence-view/vacationAndAbsenceView.component';
import {VacationAndAbsenceViewService} from './clinic-administrator-home-page/vacation-and-absence-view/vacationAndAbsenceView.service';
import {DatePipe} from '@angular/common';
import { AddDoctorComponent } from './clinic-administrator-home-page/add-doctor/add-doctor.component';
import {AddDoctorService} from './clinic-administrator-home-page/add-doctor/add-doctor.service';
import {RoomsComponent} from './clinic-administrator-home-page/rooms/rooms.component';
import {RoomsService} from './clinic-administrator-home-page/rooms/rooms.service';

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
    NurseHomePageComponent,
    DoctorProfilePageComponent,
    RatingsComponent,
    EditPatientProfilePageComponent,
    DoctorProfilePageComponent,
    ClinicAdministratorHomePageComponent,
    ClinicAdministratorProfilePageComponent,
    EditClinicAdministratorComponent,
    ScheduleExamComponent,
    EditClinicAdministratorComponent,
    TypesOfMedicalExamComponent,
    AddTypeOfMedicalExamComponent,
    EditClinicAdministratorComponent,
    CcaHomePageComponent,
    RecipesComponent,
    ValidatedRecipesComponent,
    CcaProfilePageComponent,
    ShowAllMedicamentsComponent,
    AnnualLeaveAndAbsenceComponent,
    VacationAndAbsenceViewComponent,
    AddDoctorComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatCheckboxModule,
    ModalModule,
    NgbModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    RegistrationService, MedicamentService, LoginService, RegistrationRequestService,
    MedicalStaffProfileService, EditMedicalStaffService, MoreInfoRegisterRequestService, ClinicService, AuthService,
    PatientHomePageService,  ConfirmationMessageService, DoctorProfilePageService, EditClinicAdministrator,
    EditPatientProfilePageService, NurseHomePageService, TypesOfMedicalExamService, AddTypeOfMedicalExamService,
    CcaHomePageService, RecipesService,
    ValidatedRecipesService, CcaProfilePageService, ShowAllMedicamentsService, AddDoctorService, AnnualLeaveAndAbsenceService,
    VacationAndAbsenceViewService, DatePipe, RoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
