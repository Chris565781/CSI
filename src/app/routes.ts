import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
