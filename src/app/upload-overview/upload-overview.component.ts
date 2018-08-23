import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { Photo } from '../_models/photo';


@Component({
  selector: 'app-upload-overview',
  templateUrl: './upload-overview.component.html',
  styleUrls: ['./upload-overview.component.css']
})
export class UploadOverviewComponent implements OnInit {
  selectedIndex: any;
  model: any = {};
  user: User;
  token: any;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentPhoto: Photo;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initialiseUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.currentPhoto = photo;
        this.dialogRef.close();
      }
    };
  }

  constructor(
    public dialogRef: MatDialogRef<UploadOverviewComponent>,
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

  ngOnInit() {
    this.initialiseUploader();
   }
}
