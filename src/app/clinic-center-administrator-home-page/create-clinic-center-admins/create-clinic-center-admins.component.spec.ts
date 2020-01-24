import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClinicCenterAdminsComponent } from './create-clinic-center-admins.component';

describe('CreateClinicCenterAdminsComponent', () => {
  let component: CreateClinicCenterAdminsComponent;
  let fixture: ComponentFixture<CreateClinicCenterAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClinicCenterAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClinicCenterAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
