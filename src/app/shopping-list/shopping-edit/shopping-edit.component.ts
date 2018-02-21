import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;
  private subscriptionStartedEditing: Subscription;
  editMode: boolean;
  private editedItemIndex: number;
  private editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService ,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.subscriptionStartedEditing = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue(
          {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionStartedEditing.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
