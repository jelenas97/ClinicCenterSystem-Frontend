import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeOfMedicalExam} from '../../model/typeOfMedicalExam';


@Injectable()
export class TypesOfMedicalExamService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/typesOfMedicalExam/';
  }


  getAll(): Observable<TypeOfMedicalExam[]> {
      return this.http.get<TypeOfMedicalExam[]>(this.url);
  }

  public remove(id: number) {
    return this.http.delete(this.url + 'removeType/' + id);
  }

  public update(type: any) {
    return this.http.put<TypeOfMedicalExam>(this.url, type);
  }
}
