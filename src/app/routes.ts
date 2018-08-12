import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
