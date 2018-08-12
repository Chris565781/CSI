import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  selectedIndex: any;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<OverviewComponent>,
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
    this.authService.login(this.model).subscribe(next => {
      console.log('logged in successfully');
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

  userRegister() {

  }

  ngOnInit() {}
}
