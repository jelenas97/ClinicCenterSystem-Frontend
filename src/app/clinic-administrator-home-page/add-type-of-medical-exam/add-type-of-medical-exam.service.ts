import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {TypeOfMedicalExam} from '../../model/typeOfMedicalExam';

@Injectable()
export class AddTypeOfMedicalExamService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/typesOfMedicalExam/';
  }

  public addType(type: TypeOfMedicalExam): Observable<TypeOfMedicalExam>{
    return this.http.post<TypeOfMedicalExam>(this.url, type);

  }
}
