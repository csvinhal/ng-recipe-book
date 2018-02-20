import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  private URL = 'https://ng-recipe-book-a8120.firebaseio.com/';

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    return this.http.put(`${this.URL}/recipes.json`, this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.URL}/recipes.json`)
      .map(
        recipes => {
          recipes.forEach((recipe: Recipe) => {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          });
          return recipes;
        }
      )
      .subscribe(
        recipes => this.recipeService.setRecipes(recipes)
      );
  }
}