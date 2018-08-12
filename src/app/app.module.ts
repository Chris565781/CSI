import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule } from '@angular/router';
import { HomeCardsComponent } from './homeCards/homeCards.component';
import { appRoutes } from './routes';
import { FooterComponent } from './footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FeedbackComponent,
    OverviewComponent,
    HomeCardsComponent,
    FooterComponent,
    MainNavComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [OverviewComponent],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
