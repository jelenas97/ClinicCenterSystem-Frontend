import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsPredefinedExamsComponent } from './clinics-predefined-exams.component';

describe('ClinicsPredefinedExamsComponent', () => {
  let component: ClinicsPredefinedExamsComponent;
  let fixture: ComponentFixture<ClinicsPredefinedExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicsPredefinedExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsPredefinedExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
