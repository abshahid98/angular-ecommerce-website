import { AdapterService } from '../adapter/adapter.service';
import { Injectable, OnInit } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { User } from '../../models/user';
import { FirebaseService } from '../firebase/firebase.service';
import { Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IHNotificationService } from 'ih-ng-notification';
import { AuthResponse } from '../../models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  obs!: Subscription;
  constructor(
    private adapter: AdapterService,
    private firebaseService: FirebaseService,
    private readonly notificationService: IHNotificationService,
    private jwt: JwtService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public login({ email: username, password }: User) {
    this.adapter.login(username, password).subscribe({
      next: (response: any) => {
        this.obs = this.firebaseService
          .getDocumentByKey('admins', response.localId)
          .subscribe((documentData: any) => {
            response.isAdmin = documentData != undefined ? true : false;
            this.setLoginDataInStorage(response);
            window.location.reload();
            this.notificationService.success(
              'Logged In Successfully!!!',
              '',
              true,
              {
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
              }
            );
          });
      },
      error: (errorRes) => {
        this.notificationService.error(this.getErrorMsg(errorRes), '', true, {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
        //throw errorRes.error.error.message;
      },
    });
  }
  public signup({ fullName, email, password }: User) {
    this.adapter.signup(email, password).subscribe({
      next: (response: AuthResponse) => {
        this.adapter.setDisplayName(fullName, response).subscribe();
      },
      error: (errorRes: HttpErrorResponse) => {
        this.notificationService.error(this.getErrorMsg(errorRes), '', true, {
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      },
    });
  }

  public forgetPass(email: string) {}

  public isAdmin() {
    return !!this.jwt.getLoginDetails();
  }

  setLoginDataInStorage(response: any) {
    this.jwt.saveUserData(JSON.stringify(response));
  }

  public isLoggedIn() {
    return this.jwt.getLoginDetails();
  }

  public logout() {
    this.jwt.destroyUserData();
    window.location.reload();
  }

  private getErrorMsg(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return errorMessage;
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return errorMessage;
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
