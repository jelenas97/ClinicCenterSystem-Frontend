import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MedicalHistory} from '../model/medicalHistory';

@Injectable()
export class ShowMedicalHistoryService {

  private readonly allMedicalHistoryUrl: string;

  constructor(private httpClient: HttpClient) {
    this.allMedicalHistoryUrl = 'http://localhost:8080/medicalHistory/';
  }

  public getAllById(id: string): Observable<MedicalHistory[]> {
    return this.httpClient.get<MedicalHistory[]>(this.allMedicalHistoryUrl + id );
  }

}
