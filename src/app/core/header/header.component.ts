import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-store.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
    private _authService: AuthService) { }

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