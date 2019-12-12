import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../model/recipe';
import {ValidatedRecipesService} from './validatedRecipes.service';


@Component({
  templateUrl: 'validatedRecipes.component.html',
  selector: 'app-validated-recipes'
})

export class ValidatedRecipesComponent implements OnInit {

  validatedRecipes: Recipe[] = [];
  reason: string;

  constructor(private validatedRecipesService: ValidatedRecipesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.validatedRecipesService.getAllValidated().subscribe(data => {
      this.validatedRecipes = data;
    });
  }
}
