// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDQFM9qGkx-xE5Du-7wiGW3PU3FEf61Gjk',
    authDomain: 'foodapp-2c8bf.firebaseapp.com',
    databaseURL: 'https://foodapp-2c8bf.firebaseio.com',
    projectId: 'foodapp-2c8bf',
    storageBucket: '',
    messagingSenderId: '1058178855522'
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
