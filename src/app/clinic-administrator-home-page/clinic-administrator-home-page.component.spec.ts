import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAdministratorHomePageComponent } from './clinic-administrator-home-page.component';

describe('ClinicAdministratorHomePageComponent', () => {
  let component: ClinicAdministratorHomePageComponent;
  let fixture: ComponentFixture<ClinicAdministratorHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAdministratorHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAdministratorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
