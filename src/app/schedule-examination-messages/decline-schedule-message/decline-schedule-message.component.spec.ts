import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineScheduleMessageComponent } from './decline-schedule-message.component';

describe('DeclineScheduleMessageComponent', () => {
  let component: DeclineScheduleMessageComponent;
  let fixture: ComponentFixture<DeclineScheduleMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclineScheduleMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineScheduleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
