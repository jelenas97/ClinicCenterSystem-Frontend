import {Injectable} from '@angular/core';
import {Medicament} from '../model/medicament';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MedicamentService {

  private readonly registerUrl: string;
  private readonly allMedicamentsUrl: string;

  constructor(private httpClient: HttpClient) {
    this.registerUrl = 'http://localhost:8080/medicament';
    this.allMedicamentsUrl = 'http://localhost:8080/allMedicaments';
  }

  public register(medicament: Medicament): Observable<Medicament> {
    return this.httpClient.post<Medicament>(this.registerUrl, medicament);
  }

  public save(medicament: Medicament) {
    return this.httpClient.post<Medicament>(this.registerUrl, medicament);
  }

  public getAll(): Observable<Medicament[]> {
    return this.httpClient.get<Medicament[]>(this.allMedicamentsUrl);
  }

}
