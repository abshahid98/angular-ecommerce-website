// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  lang: 'en',
  // firebase: {
  //   key: 'AIzaSyD8yA_38rHfcNeNw3YDa7rsnycojIShpG0',
  // },
  firebase: {
    apiKey: 'AIzaSyD8yA_38rHfcNeNw3YDa7rsnycojIShpG0',
    authDomain: 'angular-ecommerce-2af43.firebaseapp.com',
    databaseURL: 'https://angular-ecommerce-2af43-default-rtdb.firebaseio.com',
    projectId: 'angular-ecommerce-2af43',
    storageBucket: 'angular-ecommerce-2af43.appspot.com',
    messagingSenderId: '870373963005',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
