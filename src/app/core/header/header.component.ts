import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataStorageService } from '../../shared/data-store.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from './../../store/app.reducers';
import * as fromAuth from './../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
    private _authService: AuthService,
    private store: Store<fromApp.AppState>) { }

    ngOnInit() {
      this.authState = this.store.select('auth');
    }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  get authService() {
    return this._authService;
  }
}
