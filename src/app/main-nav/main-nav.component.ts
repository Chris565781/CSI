import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material';
import { OverviewComponent } from '../overview/overview.component';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  user: any;
  isHidden: boolean;
  login = false;
  userLoggedIn: boolean;
  admin: boolean;
  token: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService,
  ) {
    this.isHidden = true;
  }

  openDialogLogin(): void {
    this.login = true;
    const dialogRef = this.dialog.open(OverviewComponent, {
      /* width: '2000px', */
      data: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /* this.authService.setToken(result); */
      console.log(this.authService.decodedToken.nameid);
      this.userService.getUser(this.authService.decodedToken.nameid, result.token).subscribe(response => {
        this.admin = response.admin;
      });
    });
  }

  openDialogRegister(): void {
    this.login = false;
    const dialogRef = this.dialog.open(OverviewComponent, {
      /* width: '2000px', */
      data: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (localStorage.getItem('token')) {
        this.userService
          .getUser(this.authService.decodedToken.nameid)
          .subscribe(response => {
            this.admin = response.admin;
          });
      }
    });
  }

  isAdmin() {
    return this.admin;
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.userService
        .getUser(this.authService.decodedToken.nameid)
        .subscribe(response => {
          this.admin = response.admin;
        });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.admin = false;
    this.alertify.success('Logged out successfully');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
