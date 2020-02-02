import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Clinic} from '../model/clinic';
import {Observable} from 'rxjs';
import {MedicalReport} from '../model/medicalReport';
import {Diagnosis} from '../model/diagnosis';
import {Medicament} from '../model/medicament';
import {MedicalExamination} from '../model/medicalExamination';
import {any} from 'codelyzer/util/function';

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

  public save(medicalReport: MedicalReport) {
    return this.httpClient.post<MedicalReport>(this.medicalReportUrl, medicalReport);
  }

  public getAllDiagnosis(): Observable<Diagnosis[]> {
    return this.httpClient.get<Diagnosis[]>(this.allDiagnosisUrl);
  }

  public getAllMedicaments(): Observable<Medicament[]> {
    return this.httpClient.get<Medicament[]>(this.allMedicamentsUrl);
  }

  getAvailableTermsForDoctor(id: string, date: string) {
    return this.httpClient.get<string[]>('http://localhost:8080/getAvailableTermsForDoctor/' + id + '/' + date);
  }

  public getMedicalExam(examId: string): Observable<MedicalExamination> {
    return this.httpClient.get<MedicalExamination>('http://localhost:8080/getMedicalExam/' + examId);
  }

  sendRequestExam(id: string, selectedDate: any, id2: string, id3: string, id4: string, selectedTerm: any) {
    return this.httpClient.put<any>('http://localhost:8080/auth/sendMedicalExamRequest/' + id + '/' + selectedDate +
      '/' + id2 + '/' + id3 + '/' + id4 + '/' + selectedTerm, any).subscribe();
  }
}
