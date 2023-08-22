import { Injectable } from '@angular/core';
// import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
/**
 * Injects the JSON web token service in the project
 */
@Injectable({
  providedIn: 'root',
})

/**
 * This service is responsible for management of the jwt token, which would be used
 * for authentication/authorization purposes. The service includes methods to save, delete
 * and retrieve the token
 */
export class JwtService {
  /**
   * This constructor initializes the required dependencies NGXLogger and TranslatePipe
   */
  constructor() {}

  /**
   * This method fetches the token from local storage and returns it.
   *
   * @method getToken
   * @return
   */
  getLoginDetails(): { [key: string]: boolean } {
    const userData = this.getUserData();

    const isLoggedIn = userData && userData.idToken ? true : false;
    const isAdmin = userData ? userData.isAdmin : false;

    return {
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
    };
  }

  /**
   * This method takes the token as an argument and saves it into the local storage.
   *
   * @param  token
   * @method saveToken
   * @return
   */
  saveToken(token: string) {
    try {
      localStorage.setItem('jwtToken', token);
    } catch (err: any) {
      throw new Error(err);
    }
  }
  /**
   * This method deletes the token from local Storage.
   *
   * @method destroyToken
   * @return
   */
  // destroyToken() {
  //   if (this.getToken() !== undefined) {
  //     localStorage.removeItem('jwtToken');
  //   } else {
  //     throw new Error(
  //       this.translate.transform('generic[responses][error][token][001]')
  //     );
  //   }
  // }

  /**
   * This method fetches the userData from local storage and returns it.
   *
   * @method getUserData
   * @return
   */
  // getUserData(): any {
  //   var userData = localStorage['userData'];
  //   if (userData !== undefined) {
  //     return JSON.parse(userData);
  //   } else {
  //     return '';
  //     // throw new Error(
  //     //   this.translate.transform('generic[responses][error][token][001]')
  //     // );
  //   }
  // }

  /**
   * This method takes the userData as an argument and saves it into the Session storage.
   *
   * @param  userData
   * @method saveUserData
   * @return
   */
  saveUserData(userData: any) {
    try {
      localStorage['userData'] = userData;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  getUserData(): any {
    var userData = localStorage['userData'];
    if (userData !== undefined) {
      return JSON.parse(userData);
    } else {
      return '';
    }
  }
  destroyUserData() {
    if (this.getUserData() !== undefined) {
      localStorage.removeItem('userData');
    }
  }
}
