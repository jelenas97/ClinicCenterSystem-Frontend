import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePredefinedExaminationsComponent } from './schedule-predefined-examinations.component';
import {By} from '@angular/platform-browser';
import {MedicalExamination} from '../../model/medicalExamination';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SchedulePredefinedExaminationsService} from './schedule-predefined-examinations.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NotifierModule, NotifierService} from 'angular-notifier';
import {NotifierQueueService} from 'angular-notifier/src/services/notifier-queue.service';
import {Room} from '../../model/room';
import {Clinic} from '../../model/clinic';
import {User} from '../../model/user';
import {TypeOfMedicalExam} from '../../model/typeOfMedicalExam';

describe('SchedulePredefinedExaminationsComponent', () => {
  let component: SchedulePredefinedExaminationsComponent;
  let fixture: ComponentFixture<SchedulePredefinedExaminationsComponent>;
  let exams: MedicalExamination[];



  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SchedulePredefinedExaminationsService, NotifierService,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NotifierModule
      ],
      declarations: [SchedulePredefinedExaminationsComponent],
    });
    fixture = TestBed.createComponent(SchedulePredefinedExaminationsComponent);
    component = fixture.componentInstance;

    exams = [{id: '1', medicalExaminationRoom : new Room(), date: '2020-02-05 03:00:00.000000', duration: 30, price: 1000,
      doctor: new User(), clinic: new Clinic(), discount: 0,  patient : new User(), type : new TypeOfMedicalExam(),
      clinicRated: true, clinicRating : 10, doctorRated: true, doctorRating : 6, confirmed: true},
      {id: '2', medicalExaminationRoom : new Room(), date: '2020-02-06 03:20:00.000000',
        duration: 30, price: 2000, doctor: new User(), clinic: new Clinic(), discount: 0,
        patient : new User(), type : new TypeOfMedicalExam(), clinicRated: true, clinicRating : 10, doctorRated: true, doctorRating : 6,
        confirmed: true}];
    component.allPredefinedExaminations = exams;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('SchedulePredefinedExaminationsComponent', () => {
    it ('table have 2 exams', () => {
      const cards = fixture.debugElement.queryAll(By.css('.trs'));
      expect(cards.length).toEqual(2);
    });

    it ('should have the date in the card', () => {
      const cards = fixture.debugElement.queryAll(By.css('#table-predefined-exams'));
      expect(cards[0].query(By.css('#exam-id')).nativeElement.textContent)
        .toEqual('2020-02-05');
    });
  });
});
