import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseAuth, AuthProviders, AuthMethods} from 'angularfire2';
import {HomePage} from '../home/home';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(private nav: NavController, public auth: FirebaseAuth) {

  }

  LoginGoogle(){
    this.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect,
    }).then((Data) => {
      this.nav.setRoot(HomePage);
    }).catch((error) => {
      console.log(error);
    })
  }

}
