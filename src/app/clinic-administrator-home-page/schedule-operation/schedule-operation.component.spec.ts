import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOperationComponent } from './schedule-operation.component';

describe('ScheduleOperationComponent', () => {
  let component: ScheduleOperationComponent;
  let fixture: ComponentFixture<ScheduleOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
