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

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MedicamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RegistrationService, MedicamentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
