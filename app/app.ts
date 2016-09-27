import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {HomePage} from './pages/home/home';
import {
  FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  FirebaseAuth
} from 'angularfire2'

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: ""
    })
  ]
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, private auth: FirebaseAuth) {
    this.auth.subscribe((data)=>{ //melakukan subscribe apakah sudah login apa belum
      if(data){ //kalau data tidak kosong
        window.localStorage.setItem('uid', data.auth.uid); //simpan uid ke localStorage
        window.localStorage.setItem('displayName', data.auth.displayName); //simpan displayName ke localStorage
        window.localStorage.setItem('photoURL', data.auth.photoURL); //simpan photoURL ke localStorage
        this.rootPage = HomePage; //redirect ke HomePage
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

}

ionicBootstrap(MyApp);
