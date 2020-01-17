import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Diagnosis} from '../model/diagnosis';

@Injectable()
export class DiagnosisService {

  private readonly diagnosisUrl: string;
  private readonly allDiagnosisUrl: string;

  constructor(private httpClient: HttpClient) {
    this.diagnosisUrl = 'http://localhost:8080/diagnosis';
    this.allDiagnosisUrl = 'http://localhost:8080/allDiagnosis';
  }

  public save(diagnosis: Diagnosis) {
    return this.httpClient.post<Diagnosis>(this.diagnosisUrl, diagnosis);
  }

  public getAll(): Observable<Diagnosis[]> {
    return this.httpClient.get<Diagnosis[]>(this.allDiagnosisUrl);
  }

}
