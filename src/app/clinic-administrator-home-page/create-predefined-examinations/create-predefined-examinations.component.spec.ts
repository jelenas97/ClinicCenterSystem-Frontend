import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePredefinedExaminationsComponent } from './create-predefined-examinations.component';

describe('CratePredefinedExaminationsComponent', () => {
  let component: CreatePredefinedExaminationsComponent;
  let fixture: ComponentFixture<CreatePredefinedExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePredefinedExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePredefinedExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
