import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
