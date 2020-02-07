import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../model/recipe';
import {RecipesService} from './recipes.service';


@Component({
  templateUrl: 'recipes.component.html',
  selector: 'app-recipes'
})

export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.recipesService.getAll().subscribe(data => {
      this.recipes = data;
    });
  }


  validateRecipe(id: number) {
    this.recipesService.validate(id).subscribe(result => this.gotoRecipes());
  }

  public gotoRecipes() {
    this.ngOnInit();
    this.router.navigate(['/allRecipes']);
  }

  rejectValidation(id: number) {
    this.recipesService.removeRecipe(id).subscribe(result => this.ngOnInit());
  }
}
