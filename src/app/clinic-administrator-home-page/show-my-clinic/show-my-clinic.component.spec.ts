import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyClinicComponent } from './show-my-clinic.component';

describe('ShowMyClinicComponent', () => {
  let component: ShowMyClinicComponent;
  let fixture: ComponentFixture<ShowMyClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMyClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMyClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
