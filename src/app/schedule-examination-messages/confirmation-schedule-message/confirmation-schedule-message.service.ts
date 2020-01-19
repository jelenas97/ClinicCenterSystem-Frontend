import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {any} from 'codelyzer/util/function';

@Injectable()
export class ConfirmationScheduleMessageService {

  constructor(private http: HttpClient) {
  }

  confirmExamination(s: string) {
    return this.http.put<any>(s, any).subscribe();
  }

}
