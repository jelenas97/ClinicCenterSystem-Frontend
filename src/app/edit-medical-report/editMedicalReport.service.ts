import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicalReport} from '../model/medicalReport';
import {Diagnosis} from '../model/diagnosis';
import {Medicament} from '../model/medicament';

@Injectable()
export class EditMedicalReportService {

  private readonly url: string;
  private allDiagnosisUrl: string;
  private allMedicamentsUrl: string;
  private saveEditedMedicalReport: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/editMedicalReport/';
    this.saveEditedMedicalReport = 'http://localhost:8080/saveEditedMedicalReport/';
    this.allDiagnosisUrl = 'http://localhost:8080/allDiagnosis';
    this.allMedicamentsUrl = 'http://localhost:8080/allMedicaments';
  }

  public getById(id: string): Observable<MedicalReport> {
    return this.http.get<MedicalReport>(this.url + id);
  }

  public update(medicalReport: MedicalReport, id: string): Observable<MedicalReport> {
     console.log(medicalReport);
     return this.http.put<MedicalReport>(this.saveEditedMedicalReport + id, medicalReport);
  }

  getAllDiagnosis() {
    return this.http.get<Diagnosis[]>(this.allDiagnosisUrl);
  }

  getAllMedicaments() {
    return this.http.get<Medicament[]>(this.allMedicamentsUrl);

  }
}
