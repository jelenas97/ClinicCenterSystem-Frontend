import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationScheduleMessageComponent } from './confirmation-schedule-message.component';

describe('ConfirmationScheduleMessageComponent', () => {
  let component: ConfirmationScheduleMessageComponent;
  let fixture: ComponentFixture<ConfirmationScheduleMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationScheduleMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationScheduleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
