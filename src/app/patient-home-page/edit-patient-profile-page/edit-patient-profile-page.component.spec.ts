import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfilePageComponent } from './edit-patient-profile-page.component';

describe('EditPatientProfilePageComponent', () => {
  let component: EditPatientProfilePageComponent;
  let fixture: ComponentFixture<EditPatientProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatientProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
