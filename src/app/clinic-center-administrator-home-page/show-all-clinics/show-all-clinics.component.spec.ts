import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllClinicsComponent } from './show-all-clinics.component';

describe('ShowAllClinicsComponent', () => {
  let component: ShowAllClinicsComponent;
  let fixture: ComponentFixture<ShowAllClinicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllClinicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
