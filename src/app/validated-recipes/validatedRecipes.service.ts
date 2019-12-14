import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../model/recipe';


@Injectable()
export class ValidatedRecipesService {

  private readonly validatedRecipesUrl: string;

  constructor(private http: HttpClient) {
    this.validatedRecipesUrl = 'http://localhost:8080/allValidatedRecipes';
  }

  public getAllValidated(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.validatedRecipesUrl);
  }

}
