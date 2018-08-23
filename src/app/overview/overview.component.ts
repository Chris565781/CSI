import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  selectedIndex: any;
  model: any = {};
  user: User;
  token: any;

  constructor(
    public dialogRef: MatDialogRef<OverviewComponent>,
    private alertify: AlertifyService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public login: boolean
  ) {
    if (login === true) {
      this.selectedIndex = 0;
      console.log('secected index set to 0');
    } else {
      this.selectedIndex = 1;
      console.log('selected index set to 1');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  userLogin() {
    console.log(this.model);
    this.authService.login(this.model).subscribe(
      next => {
        /*this.userService.getUser(this.model); */
        this.dialogRef.close({
          decodedToken: this.authService.decodedToken,
          token: this.authService.getToken(),
        });
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  userRegister() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('registration successful');
        this.selectedIndex = 0;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  ngOnInit() {}
}
