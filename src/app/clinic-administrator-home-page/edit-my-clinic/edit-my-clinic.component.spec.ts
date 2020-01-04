import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyClinicComponent } from './edit-my-clinic.component';

describe('EditMyClinicComponent', () => {
  let component: EditMyClinicComponent;
  let fixture: ComponentFixture<EditMyClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
