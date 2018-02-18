import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyB_mJWGFEIACUeA7HK2IaoMi1Dulah40To",
      authDomain: "ng-recipe-book-a8120.firebaseapp.com"
    });
  }
}
