import { AdapterService } from '../adapter/adapter.service';
import { Injectable, OnInit } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { User } from '../../interfaces/user';
import { FirebaseService } from '../firebase/firebase.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  obs!: Subscription;
  constructor(
    private adapter: AdapterService,
    private firebaseService: FirebaseService,
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
          });
      },
      error: (error) => {
        console.log('error--' + error);
      },
    });
  }
  public signup({ fullName, email, password }: User) {
    this.adapter.signup(fullName, email, password);
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

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
