import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseProfilePageComponent } from './nurse-profile-page.component';

describe('NurseProfilePageComponent', () => {
  let component: NurseProfilePageComponent;
  let fixture: ComponentFixture<NurseProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
