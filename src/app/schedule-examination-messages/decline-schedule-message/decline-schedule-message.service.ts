import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {any} from 'codelyzer/util/function';

@Injectable()
export class DeclineScheduleMessageService {

  constructor(private http: HttpClient) {
  }

  declineExamination(s: string) {
    return this.http.delete(s).subscribe();
  }
}
