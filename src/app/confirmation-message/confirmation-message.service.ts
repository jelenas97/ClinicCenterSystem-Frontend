import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {any} from 'codelyzer/util/function';
import {Observable, Subscription} from 'rxjs';

@Injectable()
export class ConfirmationMessageService {

  constructor(private http: HttpClient) {
  }


  public activateUser(url: string): Subscription {
    console.log('u servisu sam ');
    return this.http.put<any>(url, any).subscribe();
  }

}
