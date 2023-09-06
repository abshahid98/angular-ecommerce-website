import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../../models/authResponse';

const API = environment;
@Injectable({
  providedIn: 'root',
})
export class AdapterService {
  items$!: Observable<any[]>;
  constructor(private http: HttpClient) {}

  signup(username: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        API.firebase.apiKey,
      {
        email: username,
        password: password,
        returnSecureToken: true,
      }
    );
    // .subscribe({
    //   next: (response: AuthResponse) => {
    //     this.http
    //       .post<AuthResponse>(
    //         'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
    //           API.firebase.apiKey,
    //         {
    //           idToken: response.idToken,
    //           displayName: fullName,
    //           returnSecureToken: false,
    //         }
    //       )
    //       .subscribe();
    //   },
    //   error: (error) => {
    //     console.log('error--' + error);
    //   },
    // });
  }

  setDisplayName(fullName: string | undefined, response: AuthResponse) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
        API.firebase.apiKey,
      {
        idToken: response.idToken,
        displayName: fullName,
        returnSecureToken: false,
      }
    );
  }

  login(username: string, password: string) {
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
}
