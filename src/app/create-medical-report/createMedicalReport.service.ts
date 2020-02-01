import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Clinic} from '../model/clinic';
import {Observable} from 'rxjs';
import {MedicalReport} from '../model/medicalReport';
import {Diagnosis} from '../model/diagnosis';
import {Medicament} from '../model/medicament';

@Injectable()
export class CreateMedicalReportService {

  private readonly medicalReportUrl: string;
  private readonly allDiagnosisUrl: string;
  private readonly allMedicamentsUrl: string;


  constructor(private httpClient: HttpClient) {
    this.medicalReportUrl = 'http://localhost:8080/medicalReport';
    this.allDiagnosisUrl = 'http://localhost:8080/allDiagnosis';
    this.allMedicamentsUrl = 'http://localhost:8080/allMedicaments';

  }

  public save(medicalReport: MedicalReport, id: string) {
    return this.httpClient.post<MedicalReport>(this.medicalReportUrl + '/' + id, medicalReport);
  }

  public getAllDiagnosis(): Observable<Diagnosis[]> {
    return this.httpClient.get<Diagnosis[]>(this.allDiagnosisUrl);
  }

  public getAllMedicaments(): Observable<Medicament[]> {
    return this.httpClient.get<Medicament[]>(this.allMedicamentsUrl);
  }
}
