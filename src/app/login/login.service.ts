import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from '../service/config.service';

@Injectable()
export class LoginService {
  private readonly changePasswordUrl: string;

  constructor(private httpClient: HttpClient, private config: ConfigService) {
    this.changePasswordUrl = 'http://localhost:8080/auth/change-password';
  }

  public changePassword(data: string[]) {
    return this.httpClient.post<string[]>(this.config.change_password, data);
  }
}
