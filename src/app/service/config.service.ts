import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // tslint:disable-next-line:variable-name
  private _api_url = 'http://localhost:8080/api';
  // tslint:disable-next-line:variable-name
  private _auth_url = 'http://localhost:8080/auth';
  // tslint:disable-next-line:variable-name
  private _user_url = this._api_url + '/user';

  // tslint:disable-next-line:variable-name
  private _refresh_token_url = this._api_url + '/refresh';

  get refresh_token_url(): string {
    return this._refresh_token_url;
  }

  // tslint:disable-next-line:variable-name
  private _login_url = this._auth_url + '/login';
  // tslint:disable-next-line:variable-name
  private _registration_url = this._auth_url + '/registration';

  get login_url(): string {
    return this._login_url;
  }

  get registration_url(): string {
    return  this._registration_url;
  }

  // tslint:disable-next-line:variable-name
  private _change_password_url = this._auth_url + '/change-password';

  get change_password_url(): string {
    return this._change_password_url;
  }

  // tslint:disable-next-line:variable-name
  private _whoami_url = this._api_url + '/whoami';

  get whoami_url(): string {
    return this._whoami_url;
  }

  // tslint:disable-next-line:variable-name
  private _users_url = this._user_url + '/all';

  get users_url(): string {
    return this._users_url;
  }

  // tslint:disable-next-line:variable-name
  private _foo_url = this._api_url + '/foo';

  get foo_url(): string {
    return this._foo_url;
  }

  // tslint:disable-next-line:variable-name
  private _signup_url = this._auth_url + '/signup';

  get signup_url(): string {
    return this._signup_url;
  }

}
