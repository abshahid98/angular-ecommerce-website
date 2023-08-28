import { Router } from '@angular/router';
import { AdapterService } from '../adapter/adapter.service';
import { Injectable, OnInit } from '@angular/core';
// import { User } from '../../meta/user';
import { JwtService } from '../jwt/jwt.service';
//import { IHNotificationService } from 'ih-ng-notification';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user';
import { FirebaseService } from '../firebase/firebase.service';
import { Subscription } from 'rxjs';
//import { AdminLoginComponent } from 'src/app/views/admin-login/admin-login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  obs!: Subscription;
  constructor(
    private adapter: AdapterService,
    private firebaseService: FirebaseService,
    private jwt: JwtService // private router: Router, // private matDialog: MatDialog, // private notificationService: IHNotificationService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public login({ email: username, password }: User) {
    //console.log('in auth');
    let isAdmin = false;
    this.adapter.login(username, password).subscribe({
      next: (response: any) => {
        //console.log('res--' + response);
        this.obs = this.firebaseService
          .getDocumentByKey('admins', response.localId)
          .subscribe((documentData: any) => {
            console.log('Document Data:', documentData);
            response.isAdmin = documentData != undefined ? true : false;
            this.setLoginDataInStorage(response);
          });
      },
      error: (error) => {
        //console.log('error--' + error);
        // this.notificationService.error(
        //   'You have entered wrong credentials',
        //   '',
        //   true,
        //   {
        //     verticalPosition: 'bottom',
        //     horizontalPosition: 'right',
        //   }
        // );
      },
    });
    //return isAdmin;
  }
  public signup({ fullName, email, password }: User) {
    //console.log('in auth');
    let isAdmin = false;
    this.adapter.signup(fullName, email, password);
    //.subscribe({
    //   next: (response: any) => {
    //     //console.log('res--' + response);
    //     this.obs = this.firebaseService
    //       .getDocumentByKey('admins', response.localId)
    //       .subscribe((documentData: any) => {
    //         console.log('Document Data:', documentData);
    //         response.isAdmin = documentData != undefined ? true : false;
    //         this.setLoginDataInStorage(response);
    //       });
    //   },
    //   error: (error) => {
    //     //console.log('error--' + error);
    //     // this.notificationService.error(
    //     //   'You have entered wrong credentials',
    //     //   '',
    //     //   true,
    //     //   {
    //     //     verticalPosition: 'bottom',
    //     //     horizontalPosition: 'right',
    //     //   }
    //     // );
    //   },
    // });
    //return isAdmin;
  }

  public forgetPass(email: string) {}

  // public notify(msg: string) {
  //   this.notificationService.warning(msg, '', true, {
  //     verticalPosition: 'bottom',
  //     horizontalPosition: 'right',
  //   });
  // }

  public isAdmin() {
    return !!this.jwt.getLoginDetails();
  }

  setLoginDataInStorage(response: any) {
    this.jwt.saveUserData(JSON.stringify(response));
    // this.jwt.saveToken(response.idToken);
  }

  public isLoggedIn() {
    return this.jwt.getLoginDetails();
  }

  public logout() {
    this.jwt.destroyUserData();
  }

  ngOnDestroy() {
    console.log('Component Destroyed ');
    this.obs.unsubscribe();
  }
}
