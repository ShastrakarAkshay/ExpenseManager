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
        // this.router.navigate(['home']);
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.angularAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.angularAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          this.snackBar.open('Please Verify Your Email. Kindly check your inbox.')
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
        }
      }).catch((error) => {
        window.alert(error.message)
      })
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
      .then(() => this.snackBar.open('Password Reset email sent!'))
      .catch((error) => console.log(error))
  }

}
