// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDi927U8H8Zp4VDzQM7llzbaJDqXlTAELs",
    authDomain: "timeouttest-f5324.firebaseapp.com",
    databaseURL: "https://timeouttest-f5324.firebaseio.com",
    projectId: "timeouttest-f5324",
    storageBucket: "timeouttest-f5324.appspot.com",
    messagingSenderId: "397007818056"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
