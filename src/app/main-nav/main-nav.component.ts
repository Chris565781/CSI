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
import { UploadOverviewComponent } from '../upload-overview/upload-overview.component';
import { Photo } from '../_models/photo';

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
  currentPhoto: any;

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
        this.currentPhoto = response.photoUrl;
        if (this.currentPhoto == null) {
          this.currentPhoto = 'https://i.redd.it/1s0j5e4fhws01.png';
        }
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
    });
  }

  openDialogPhoto(): void {
    const dialogRef2 = this.dialog.open(UploadOverviewComponent, {
      /* width: '2000px', */
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result != null) {
        this.currentPhoto = result;
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
          this.currentPhoto = response.photoUrl;
          if (this.currentPhoto == null) {
            this.currentPhoto = 'https://i.redd.it/1s0j5e4fhws01.png';
          }
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
