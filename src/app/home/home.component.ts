import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeCards: boolean;
  model: any = {};
  constructor() {
    this.homeCards = true;
   }

  ngOnInit() {
  }

}
