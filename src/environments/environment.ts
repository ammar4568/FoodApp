// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC0CZRUrOkpKeZF5eeEnC6SOPmno-WMLgw',
    authDomain: 'foodapp-27c35.firebaseapp.com',
    databaseURL: 'https://foodapp-27c35.firebaseio.com',
    projectId: 'foodapp-27c35',
    storageBucket: 'foodapp-27c35.appspot.com',
    messagingSenderId: '439207162221'
  },
  stripeKey: 'pk_test_vXAWdJvKCqroSfeXXol2afN7'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
