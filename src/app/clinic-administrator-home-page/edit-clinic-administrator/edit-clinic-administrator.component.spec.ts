import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClinicAdministratorComponent } from './edit-clinic-administrator.component';

describe('EditClinicAdministratorComponent', () => {
  let component: EditClinicAdministratorComponent;
  let fixture: ComponentFixture<EditClinicAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClinicAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClinicAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
