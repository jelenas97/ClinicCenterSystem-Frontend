import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Medicament} from '../model/medicament';


@Injectable()
export class ShowAllMedicamentsService {

  private readonly allMedicamentsUrl: string;

  constructor(private http: HttpClient) {
    this.allMedicamentsUrl = 'http://localhost:8080/allMedicaments';
  }

  public getAll(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(this.allMedicamentsUrl);
  }

}
