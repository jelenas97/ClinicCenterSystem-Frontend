import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../model/recipe';


@Injectable()
export class RecipesService {

  private readonly recipesUrl: string;

  constructor(private http: HttpClient) {
    this.recipesUrl = 'http://localhost:8080/allRecipes';
  }

  public getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  public validate(id: number) {
    return this.http.get<Recipe>(this.recipesUrl + '/' + id);
    console.log(id);
  }
}
