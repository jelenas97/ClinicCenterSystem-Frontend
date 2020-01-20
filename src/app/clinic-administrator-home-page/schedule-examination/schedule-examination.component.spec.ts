import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleExaminationComponent } from './schedule-examination.component';

describe('ScheduleExaminationComponent', () => {
  let component: ScheduleExaminationComponent;
  let fixture: ComponentFixture<ScheduleExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
