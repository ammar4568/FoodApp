// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyADKDOngPhbb9gGmLeyQaMtG3c8Lbw1T9o',
    authDomain: 'food-app-fd086.firebaseapp.com',
    databaseURL: 'https://food-app-fd086.firebaseio.com',
    projectId: 'food-app-fd086',
    storageBucket: 'food-app-fd086.appspot.com',
    messagingSenderId: '57097934979'
  },
  stripeKey: 'pk_test_uGBo2gTRYmpQ78swjYlVeOAc'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
