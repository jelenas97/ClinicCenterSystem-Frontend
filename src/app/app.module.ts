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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AnnualLeaveAndAbsenceComponent} from './annual-leave-and-absence/annualLeaveAndAbsence.component';
import {AnnualLeaveAndAbsenceService} from './annual-leave-and-absence/annualLeaveAndAbsence.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {VacationAndAbsenceViewComponent} from './clinic-administrator-home-page/vacation-and-absence-view/vacationAndAbsenceView.component';
import {VacationAndAbsenceViewService} from './clinic-administrator-home-page/vacation-and-absence-view/vacationAndAbsenceView.service';
import { AddDoctorComponent } from './clinic-administrator-home-page/add-doctor/add-doctor.component';
import {AddDoctorService} from './clinic-administrator-home-page/add-doctor/add-doctor.service';
import { ShowAndRemoveDoctorsComponent } from './clinic-administrator-home-page/show-and-remove-doctors/show-and-remove-doctors.component';
import {ShowAndRemoveDoctorsService} from './clinic-administrator-home-page/show-and-remove-doctors/show-and-remove-doctors.service';
import { EditMyClinicComponent } from './clinic-administrator-home-page/edit-my-clinic/edit-my-clinic.component';
import {EditMyClinicService} from './clinic-administrator-home-page/edit-my-clinic/edit-my-clinic.service';
import { ShowMyClinicComponent } from './clinic-administrator-home-page/show-my-clinic/show-my-clinic.component';
import {ShowMyClinicService} from './clinic-administrator-home-page/show-my-clinic/show-my-clinic.service';
import {WorkCalendarComponent} from './work-calendar/workCalendar.component';
import {WorkCalendarService} from './work-calendar/workCalendar.service';
import {DatePipe, CommonModule} from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {DiagnosisComponent} from './diagnosis/diagnosis.component';
import {DiagnosisService} from './diagnosis/diagnosis.service';
import {MedicalExamRoomsComponent} from './clinic-administrator-home-page/rooms/medical-exam-rooms/medical-exam-rooms.component';
import {MedicalExamRoomsService} from './clinic-administrator-home-page/rooms/medical-exam-rooms/medical-exam-rooms.service';
import {OperationRoomsService} from './clinic-administrator-home-page/rooms/operation-rooms/operation-rooms.service';
import {OperationRoomsComponent} from './clinic-administrator-home-page/rooms/operation-rooms/operation-rooms.component';
import {AddOperationRoomComponent} from './clinic-administrator-home-page/rooms/operation-rooms/add-operation-room/add-operation-room.component';
// tslint:disable-next-line:max-line-length
import {AddOperationRoomService} from './clinic-administrator-home-page/rooms/operation-rooms/add-operation-room/add-operation-room.service';
import {AddMedicalExamRoomComponent} from './clinic-administrator-home-page/rooms/medical-exam-rooms/add-medical-exam-room/add-medical-exam-room.component';
import {AddMedicalExamRoomService} from './clinic-administrator-home-page/rooms/medical-exam-rooms/add-medical-exam-room/add-medical-exam-room.service';
import {ClinicAdministratorHomePageService} from './clinic-administrator-home-page/clinic-administrator-home-page.service';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import {MedicalExaminationRequestsComponent} from './clinic-administrator-home-page/medical-examination-requests/medical-examination-requests.component';
import {MedicalExaminationRequestsService} from './clinic-administrator-home-page/medical-examination-requests/medical-examination-requests.service';
import { ScheduleExaminationComponent } from './clinic-administrator-home-page/schedule-examination/schedule-examination.component';
import {ScheduleExaminationService} from './clinic-administrator-home-page/schedule-examination/schedule-examination.service';
import { ConfirmationScheduleMessageComponent } from './schedule-examination-messages/confirmation-schedule-message/confirmation-schedule-message.component';
import { DeclineScheduleMessageComponent } from './schedule-examination-messages/decline-schedule-message/decline-schedule-message.component';
import {ConfirmationScheduleMessageService} from './schedule-examination-messages/confirmation-schedule-message/confirmation-schedule-message.service';
import {DeclineScheduleMessageService} from './schedule-examination-messages/decline-schedule-message/decline-schedule-message.service';
import {EditProfilePageCCAComponent} from './clinic-center-administrator-home-page/edit-profile-page/editProfilePageCCA.component';
import {EditProfilePageCCAService} from './clinic-center-administrator-home-page/edit-profile-page/editProfilePageCCA.service';
import {AddClinicAdminComponent} from './clinic-center-administrator-home-page/createClinicAdmin/addClinicAdmin.component';
import {AddClinicAdminService} from './clinic-center-administrator-home-page/createClinicAdmin/addClinicAdmin.service';
import {ShowAllClinicAdminsComponent} from './clinic-center-administrator-home-page/show-all-clinic-admins/showAllClinicAdmins.component';
import {ShowAllClinicAdminsService} from './clinic-center-administrator-home-page/show-all-clinic-admins/showAllClinicAdmins.service';
// tslint:disable-next-line:max-line-length
import {RoomOccupationCalendarComponent} from './clinic-administrator-home-page/room-occupation-calendar/room-occupation-calendar.component';
import {RoomOccupationCalendarService} from './clinic-administrator-home-page/room-occupation-calendar/room-occupation-calendar.service';
import { CreatePredefinedExaminationsComponent } from './clinic-administrator-home-page/create-predefined-examinations/create-predefined-examinations.component';
import {CreatePredefinedExaminationsService} from './clinic-administrator-home-page/create-predefined-examinations/create-predefined-examinations.service';
import { SchedulePredefinedExaminationsComponent } from './patient-home-page/schedule-predefined-examinations/schedule-predefined-examinations.component';
import {SchedulePredefinedExaminationsService} from './patient-home-page/schedule-predefined-examinations/schedule-predefined-examinations.service';
import {AllPatientsComponent} from './all-patients/all-patients.component';
import {AllPatientsService} from './all-patients/all-patients.service';
import {PatientProfileForMedicalStaffComponent} from './patient-profile-for-medical-staff/patient-profile-for-medical-staff.component';
import {PatientProfileForMedicalStaffService} from './patient-profile-for-medical-staff/patient-profile-for-medical-staff.service';
import { CreateClinicCenterAdminsComponent } from './clinic-center-administrator-home-page/create-clinic-center-admins/create-clinic-center-admins.component';
import {CreateClinicCenterAdminsService} from './clinic-center-administrator-home-page/create-clinic-center-admins/create-clinic-center-admins.service';
import {CreateMedicalReportComponent} from './create-medical-report/createMedicalReport.component';
import {CreateMedicalReportService} from './create-medical-report/createMedicalReport.service';
import {NurseProfilePageComponent} from './nurse-home-page/nurse-profile-page/nurse-profile-page.component';
import {NurseProfilePageService} from './nurse-home-page/nurse-profile-page/nurse-profile-page.service';
import { ScheduleOperationComponent } from './clinic-administrator-home-page/schedule-operation/schedule-operation.component';
import { MedicalOperationRequestsComponent } from './clinic-administrator-home-page/medical-operation-requests/medical-operation-requests.component';
import {MedicalOperationRequestsService} from './clinic-administrator-home-page/medical-operation-requests/medical-operation-requests.service';
import {ScheduleOperationService} from './clinic-administrator-home-page/schedule-operation/schedule-operation.service';
import {ShowMedicalRecordComponent} from './show-medical-record/showMedicalRecord.component';
import {ShowMedicalRecordService} from './show-medical-record/showMedicalRecord.service';
import {BeginExamComponent} from './begin-exam/beginExam.component';
import {BeginExamService} from './begin-exam/beginExam.service';
import {EditMedicalRecordBasicInfoComponent} from './edit-medical-record-basic-info/editMedicalRecordBasicInfo.component';
import {EditMedicalRecordBasicInfoService} from './edit-medical-record-basic-info/editMedicalRecordBasicInfo.service';
import {MatSortModule} from '@angular/material/sort';
import {ClinicExamsComponent} from './clinic-administrator-home-page/clinic-exams/clinic-exams.component';
import {ClinicExamsService} from './clinic-administrator-home-page/clinic-exams/clinic-exams.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { ChartsModule } from 'ng2-charts';
import {ClinicIncomeService} from './clinic-administrator-home-page/clinic-income/clinic-income.service';
import {ClinicIncomeComponent} from './clinic-administrator-home-page/clinic-income/clinic-income.component';

import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

import {keyframes} from '@angular/animations';
import {PatientMedicalRecordComponent} from './patient-medical-record/patientMedicalRecord.component';
import {PatientMedicalRecordService} from './patient-medical-record/patientMedicalRecord.service';
import {ShowMedicalHistoryService} from './show-medical-history/showMedicalHistory.service';
import {ShowMedicalHistoryComponent} from './show-medical-history/showMedicalHistory.component';
import {EditMedicalReportComponent} from './edit-medical-report/editMedicalReport.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {EditMedicalReportService} from './edit-medical-report/editMedicalReport.service';
import { ClinicsPredefinedExamsComponent } from './patient-home-page/clinics-predefined-exams/clinics-predefined-exams.component';
import {ClinicsPredefinedExamsService} from './patient-home-page/clinics-predefined-exams/clinics-predefined-exams.service';
import { ShowAllClinicsComponent } from './clinic-center-administrator-home-page/show-all-clinics/show-all-clinics.component';
import {ShowAllClinicsService} from './clinic-center-administrator-home-page/show-all-clinics/show-all-clinics.service';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


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
    AnnualLeaveAndAbsenceComponent,
    VacationAndAbsenceViewComponent,
    AddDoctorComponent,
    ShowAndRemoveDoctorsComponent,
    EditMyClinicComponent,
    ShowMyClinicComponent,
    VacationAndAbsenceViewComponent,
    WorkCalendarComponent,
    DiagnosisComponent,
    WorkCalendarComponent,
    VacationAndAbsenceViewComponent,
    AddDoctorComponent,
    MedicalExamRoomsComponent,
    OperationRoomsComponent,
    AddOperationRoomComponent,
    AddMedicalExamRoomComponent,
    MedicalExaminationRequestsComponent,
    ScheduleExaminationComponent,
    ConfirmationScheduleMessageComponent,
    DeclineScheduleMessageComponent,
    EditProfilePageCCAComponent,
    AddClinicAdminComponent,
    ShowAllClinicAdminsComponent,
    CreatePredefinedExaminationsComponent,
    SchedulePredefinedExaminationsComponent,
    ShowAllClinicAdminsComponent,
    AllPatientsComponent,
    ShowAllClinicAdminsComponent,
    RoomOccupationCalendarComponent,
    PatientProfileForMedicalStaffComponent,
    CreateMedicalReportComponent,
    RoomOccupationCalendarComponent,
    CreateClinicCenterAdminsComponent,
    NurseProfilePageComponent,
    ScheduleOperationComponent,
    MedicalOperationRequestsComponent,
    ShowMedicalRecordComponent,
    BeginExamComponent,
    EditMedicalRecordBasicInfoComponent,
    ShowMedicalHistoryComponent,
    EditMedicalReportComponent,
    CreateClinicCenterAdminsComponent,
    ClinicExamsComponent,
    ClinicIncomeComponent,
    PatientMedicalRecordComponent,
    ClinicsPredefinedExamsComponent,
    ShowAllClinicsComponent
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
    NgbModalModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatRadioModule,
    NotifierModule.withConfig(customNotifierOptions),
    FlatpickrModule.forRoot(),
    jqxChartModule,
    ChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCyn7KEG1JYg3IefpdfMK0kMLV6FBKZx5k'}),
    MatSortModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    GoogleMapsAPIWrapper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe,
    RegistrationService,
    MedicamentService,
    LoginService,
    RegistrationRequestService,
    MedicalStaffProfileService,
    EditMedicalStaffService,
    MoreInfoRegisterRequestService,
    ClinicService,
    AuthService,
    PatientHomePageService,
    ConfirmationMessageService,
    DoctorProfilePageService,
    EditClinicAdministrator,
    EditPatientProfilePageService,
    NurseHomePageService,
    TypesOfMedicalExamService,
    AddTypeOfMedicalExamService,
    CcaHomePageService,
    RecipesService,
    ValidatedRecipesService,
    CcaProfilePageService,
    AddDoctorService,
    AnnualLeaveAndAbsenceService,
    VacationAndAbsenceViewService,
    DatePipe,
    ShowAndRemoveDoctorsService,
    ClinicAdministratorHomePageService,
    EditMyClinicService,
    AddDoctorService,
    ShowMyClinicService,
    WorkCalendarService,
    MedicalExamRoomsService,
    OperationRoomsService,
    AddOperationRoomService,
    AddMedicalExamRoomService,
    MedicalExaminationRequestsService,
    ScheduleExaminationService,
    ConfirmationScheduleMessageService,
    DeclineScheduleMessageService,
    MedicalExamRoomsService,
    OperationRoomsService,
    DiagnosisService,
    EditProfilePageCCAService,
    AddClinicAdminService,
    ShowAllClinicAdminsService,
    RoomOccupationCalendarService,
    CreatePredefinedExaminationsService,
    SchedulePredefinedExaminationsService,
    CreateClinicCenterAdminsService,
    CreateMedicalReportService,
    AllPatientsService,
    PatientProfileForMedicalStaffService,
    NurseProfilePageService,
    MedicalOperationRequestsService,
    ScheduleOperationService,
    BeginExamService,
    ShowMedicalRecordService,
    EditMedicalRecordBasicInfoService,
    ShowMedicalHistoryService,
    EditMedicalReportService,
    ClinicExamsService,
    ClinicIncomeService,
    PatientMedicalRecordService,
    ClinicsPredefinedExamsService,
    ShowAllClinicsService
  ],
  bootstrap: [AppComponent],
  exports: [WorkCalendarComponent, RoomOccupationCalendarComponent, ClinicExamsComponent]
})
export class AppModule {}
