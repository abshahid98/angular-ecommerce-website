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

  signup(fullName: string | undefined, username: string, password: string) {
    this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          API.firebase.apiKey,
        {
          email: username,
          password: password,
          returnSecureToken: true,
        }
      )
      .subscribe({
        next: (response: AuthResponse) => {
          this.http
            .post<AuthResponse>(
              'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
                API.firebase.apiKey,
              {
                idToken: response.idToken,
                displayName: fullName,
                returnSecureToken: false,
              }
            )
            .subscribe();
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
  }

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
    //eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYW5ndWxhci1lY29tbWVyY2UtMmFmNDMiLCJhdWQiOiJhbmd1bGFyLWVjb21tZXJjZS0yYWY0MyIsImF1dGhfdGltZSI6MTY5Mjc5NTUxNSwidXNlcl9pZCI6IkhDVGRVYjR6YklWbDFlak85NVpuWjdEekFvZDIiLCJzdWIiOiJIQ1RkVWI0emJJVmwxZWpPOTVablo3RHpBb2QyIiwiaWF0IjoxNjkyNzk1NTE1LCJleHAiOjE2OTI3OTkxMTUsImVtYWlsIjoidGVzdEBtYWlsaW5hdG9yLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QG1haWxpbmF0b3IuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.EeXqddTwbV7rQIRWIKyGB5b1SgIpWpADsVggMYNbdKvmDEY5RCaTSWS24HHP_tLziAXQ5lKrbdLl7J4DJNgFCggroOuh2R2yhYsRGPJ3ixnnGXdQoi8bgtVLr-b5QYoey3_P6RnpAyyefG2nAmtGbIMWGTr1SevLlGY5eJQQFG2rFYqANKWt7vTkqCA-GbsNEXtZ-qERXhW4RNOtDr4wHS8swCuTxF6meZiXMIX78nH09RTWksPDkmz9CyZxdCrtlCohy_xrWr8kcSu1FWTSdyDYiXaCYtRgOVqZgnfoDOgjxJSMlJsq7Wr3n1bI7Nbgru216zeX1Xj7Uxs_PMZ7mw
    // return this.http.post<AuthResponse>(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
    //     API.firebase.apiKey,
    //   {
    //     idToken:
    //       'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYW5ndWxhci1lY29tbWVyY2UtMmFmNDMiLCJhdWQiOiJhbmd1bGFyLWVjb21tZXJjZS0yYWY0MyIsImF1dGhfdGltZSI6MTY5Mjc5NTczNSwidXNlcl9pZCI6IkkwWFI1MDR3SkFTZVBRdGVqMEQzeHhYemswbDIiLCJzdWIiOiJJMFhSNTA0d0pBU2VQUXRlajBEM3h4WHprMGwyIiwiaWF0IjoxNjkyNzk1NzM1LCJleHAiOjE2OTI3OTkzMzUsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWRtaW5AbWFpbGluYXRvci5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.GteGEBKbilfgAD4lZC4-xDhcpBiFignXweqHPLuxhHalL8CL6Cu17yZAVcVYx0xb6MUAZ5FkjVWEI_JuROQud6ka6FTjtqw0KbB-Zy_RpP8yywxiZWoaoaCCGePEEiDK3fdL-LzUOGBV9wpQEmqTu5oMWygsSTZChxJrca-_ADJQa1QfuQHAFnN32Rlv3rU-gluSiQc0j-tYUqV3j54T-0GjMmaPCDwEY3jvkW0Rsmnq8Qn5-86e-c7cMu5rPnLz3pG1Tl7yh0zoZdRc7aeECXWhCZNf6ubV2lQCCO9bcTgZCiQ0twyLepgD2DDi6TXh2Zjv6XdSqrkPkk3oTSIbUQ',
    //     displayName: 'Admin',
    //     returnSecureToken: true,
    //   }
    // );
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
