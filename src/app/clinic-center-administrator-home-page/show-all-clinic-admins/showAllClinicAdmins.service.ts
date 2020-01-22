import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ClinicAdmin} from '../../model/clinicAdmin';

@Injectable()
export class ShowAllClinicAdminsService {

  private readonly allAdminsUrl: string;
  private readonly  deleteAdminUrl: string;

  constructor(private httpClient: HttpClient) {
    this.allAdminsUrl = 'http://localhost:8080/getAllClinicAdmins';
    this.deleteAdminUrl = 'http://localhost:8080/deleteClinicAdmin/';
  }

  public getAll(): Observable<ClinicAdmin[]> {
    return this.httpClient.get<ClinicAdmin[]>(this.allAdminsUrl);
  }

  public removeClinicAdmin(id: number) {
    return this.httpClient.delete<ClinicAdmin>(this.deleteAdminUrl + id);
  }

}
