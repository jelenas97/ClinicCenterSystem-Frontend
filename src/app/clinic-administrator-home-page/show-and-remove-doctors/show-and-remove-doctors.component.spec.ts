import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAndRemoveDoctorsComponent } from './show-and-remove-doctors.component';

describe('ShowAndRemoveDoctorsComponent', () => {
  let component: ShowAndRemoveDoctorsComponent;
  let fixture: ComponentFixture<ShowAndRemoveDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAndRemoveDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAndRemoveDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
