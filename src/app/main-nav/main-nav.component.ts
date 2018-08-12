import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverviewComponent } from '../overview/overview.component';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
  isHidden: boolean;
  login = false;
  userLoggedIn: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
  ) {
    this.isHidden = true;
  }

  openDialogLogin(): void {
    this.login = true;
    const dialogRef = this.dialog.open(OverviewComponent, {
      /* width: '2000px', */
      data: true
    });
  }

  openDialogRegister(): void {
    this.login = false;
    const dialogRef = this.dialog.open(OverviewComponent, {
      /* width: '2000px', */
      data: false
    });
  }

  ngOnInit() {
    this.authService.currentLoginbs.subscribe(
      loginbs => (this.userLoggedIn = loginbs)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userLoggedIn = false;
    this.alertify.success('Logged out');
    this.router.navigate(['/home']);
  }
}
