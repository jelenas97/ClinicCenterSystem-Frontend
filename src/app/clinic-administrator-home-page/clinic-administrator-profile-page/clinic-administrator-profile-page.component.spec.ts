import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdministratorProfilePageComponent } from './clinic-administrator-profile-page.component';

describe('ClinicAdministratorProfilePageComponent', () => {
  let component: ClinicAdministratorProfilePageComponent;
  let fixture: ComponentFixture<ClinicAdministratorProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAdministratorProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAdministratorProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
