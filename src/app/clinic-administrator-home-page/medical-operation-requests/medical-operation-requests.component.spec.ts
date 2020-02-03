import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalOperationRequestsComponent } from './medical-operation-requests.component';

describe('MedicalOperationRequestsComponent', () => {
  let component: MedicalOperationRequestsComponent;
  let fixture: ComponentFixture<MedicalOperationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalOperationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalOperationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
