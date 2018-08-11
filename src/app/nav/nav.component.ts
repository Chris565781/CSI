import { Component, OnInit, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverviewComponent } from '../overview/overview.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navbarOpen = false;
  login = false;

  constructor(public dialog: MatDialog) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleNavbarOff() {
    this.navbarOpen = false;
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

  ngOnInit() {}
}




