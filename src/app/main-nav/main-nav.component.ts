import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  isHidden: boolean;
  login = false;
  userInfo: any = {};

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
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
      this.userInfo = result;
      console.log(this.userInfo.Username);
      console.log(this.userInfo.Password);
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
      this.userInfo = result;
    });
  }

  }
