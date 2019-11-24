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
import {MoreInfoRegisterRequestComponent} from './more-info/more-info-register-request/moreInfoRegisterRequest.component';
import {MoreInfoRegisterRequestService} from './more-info/more-info-register-request/moreInfoRegisterRequest.service';
import {AuthService} from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MedicamentComponent,
    LoginComponent,
    RegistrationRequestComponent,
    MoreInfoRegisterRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [RegistrationService, MedicamentService, LoginService, RegistrationRequestService, MoreInfoRegisterRequestService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
