import {Injectable} from '@angular/core';
import {Medicament} from '../model/medicament';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MedicamentService {

  private readonly registerUrl: string;

  constructor(private httpClient: HttpClient) {
    this.registerUrl = 'http://localhost:8080/medicament';
  }

  public register(medicament: Medicament): Observable<Medicament> {
    return this.httpClient.post<Medicament>(this.registerUrl, medicament);
  }

  public save(medicament: Medicament) {
    return this.httpClient.post<Medicament>(this.registerUrl, medicament);
  }

}
