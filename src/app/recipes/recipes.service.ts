import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../model/recipe';


@Injectable()
export class RecipesService {

  private readonly recipesUrl: string;
  private readonly validateUrl: string;

  constructor(private http: HttpClient) {
    this.recipesUrl = 'http://localhost:8080/allRecipes';
    this.validateUrl = 'http://localhost:8080/validate';
  }

  public getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  public validate(id: number) {
    return this.http.get<Recipe>(this.validateUrl + '/' + id);
  }

  public removeRecipe(id: number) {
    return this.http.delete(this.recipesUrl + '/removeRecipe/' + id);
  }
}
