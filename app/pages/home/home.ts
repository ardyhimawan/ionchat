import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {
  FirebaseAuth,
  AngularFire,
  FirebaseListObservable
} from 'angularfire2';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  firelist: FirebaseListObservable<any>;
  chat: any;
  constructor(public nav: NavController, public af: AngularFire, public auth: FirebaseAuth) {
    this.firelist = this.af.database.list('/chat', { //mengambil data
      query: {
        orderByChild: 'negativtimestamp', //order dari data yang terbaru
      }
    });
  }

  chatSend(va, vi) { //mengirim pesan chat
    this.af.database.list('/chat').push({ // menambahkan data chat ke firebase
      uid: window.localStorage.getItem('uid'),
      img: window.localStorage.getItem('photoURL'),
      username: window.localStorage.getItem('displayName'),
      chat_text: va.chatText,
      timestamp: Date.now(),
      negativtimestamp: -Date.now() //buat nanti ambil data yang terbaru
    })
    this.chat = '';
  }

  logout() { // melakukan logout
    window.localStorage.removeItem('email'); // remove email dari localStorage
    window.localStorage.removeItem('uid'); // remove uid dari localStorage
    window.localStorage.removeItem('displayName'); // remove displayName dari localStorage
    this.auth.logout();
    this.nav.setRoot(LoginPage);// kembali ke halaman LoginPage
  }

}
