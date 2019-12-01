import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) { }

  SendVerificationMail() {
    return this.angularAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.angularAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.angularAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    var user = this.angularAuth.auth.currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  SignOut() {
    return this.angularAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
    }).catch(error => console.log(error))
  }

  resetPassword(email: string) {
    var auth = this.angularAuth.auth;
    return auth.sendPasswordResetEmail(email)
      .catch((error) => console.log(error))
  }

}
