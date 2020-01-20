import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalExaminationRequestsComponent } from './medical-examination-requests.component';

describe('MedicalExaminationRequestsComponent', () => {
  let component: MedicalExaminationRequestsComponent;
  let fixture: ComponentFixture<MedicalExaminationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalExaminationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalExaminationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
