import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePredefinedExaminationsComponent } from './schedule-predefined-examinations.component';

describe('SchedulePredefinedExaminationsComponent', () => {
  let component: SchedulePredefinedExaminationsComponent;
  let fixture: ComponentFixture<SchedulePredefinedExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePredefinedExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePredefinedExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
