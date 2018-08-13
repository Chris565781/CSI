import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { NadeMapComponent } from './nade-map/nade-map.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'feedback', component: FeedbackComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'nademap', component: NadeMapComponent },
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
