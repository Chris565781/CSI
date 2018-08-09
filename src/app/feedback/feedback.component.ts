import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackEnabled: boolean;

  constructor() {
    this.feedbackEnabled = true;
  }

  onLinkClick(event: MatTabChangeEvent) {
    this.feedbackEnabled = !this.feedbackEnabled;
  }

  ngOnInit() {
  }
}
