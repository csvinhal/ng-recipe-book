import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

  private URL = 'https://ng-recipe-book-a8120.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(`${this.URL}/recipes.json`, this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get(`${this.URL}/recipes.json`).map(
      (recipes: Recipe[]) => {
        recipes.forEach((recipe: Recipe) => {
          if(!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        });
        return recipes;
      }
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}