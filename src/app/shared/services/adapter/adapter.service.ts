import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { IHNotificationService } from 'ih-ng-notification';
import { catchError, finalize, Observable } from 'rxjs';
// import { IS_SPINNER_ENABLED } from 'src/app/components/spinner2/spinner2.interceptor';
// import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { JwtService } from '../jwt/jwt.service';
import { AuthResponse } from '../../interfaces/authResponse';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { inject } from '@angular/core';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';

const API = environment;
@Injectable({
  providedIn: 'root',
})
export class AdapterService {
  items$!: Observable<any[]>;
  // collection: collection;
  constructor(
    private http: HttpClient,
    private jwt: JwtService,
    // private notificationService: IHNotificationService,
    //private loaderService: LoaderService,
    private router: Router
  ) {}

  // signup(username: string, password: string) {
  //   return this.http.post<AuthResponse>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  //       API.firebase.apiKey,
  //     {
  //       email: username,
  //       password: password,
  //       returnSecureToken: true,
  //     }
  //   );
  // }

  login(username: string, password: string) {
    //console.log('in adapter');
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        API.firebase.apiKey,
      {
        email: username,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  // checkIfAdmin(userId: string) {
  //   const itemCollection = collection(this.firestore, 'users');
  // }
  // checkIfAdminExists(uuid: string): Observable<boolean> {
  //   return this.firestore
  //     .collection('admins', (ref) => ref.where('uuid', '==', uuid))
  //     .valueChanges()
  //     .pipe(map((admins) => admins.length > 0));
  // }
}
