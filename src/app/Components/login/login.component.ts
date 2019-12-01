import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  signinForm: FormGroup;
  signupForm: FormGroup;

  @ViewChild('signin', { static: false }) signin: ElementRef;
  @ViewChild('signup', { static: false }) signup: ElementRef;

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private ngZone: NgZone, private router: Router) {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  toggleForm() {
    this.signin.nativeElement.hidden = !this.signin.nativeElement.hidden;
    this.signup.nativeElement.hidden = !this.signup.nativeElement.hidden;
  }

  signIn() {
    const signInForm = this.signinForm.value;

    this.auth.SignIn(signInForm.email, signInForm.password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.auth.SendVerificationMail();
          this.snackBar.open('Please verify email, check your inbox', '?', {
            duration: 2000
          });
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
        }
      }).catch((error) => {
        console.log(error)
        if (error.code == 'auth/wrong-password') {
          this.snackBar.open('Wrong password', '?', {
            duration: 2000
          });
        }
        if (error.code == 'auth/user-not-found') {
          this.snackBar.open('User Not Found', '?', {
            duration: 2000
          });
        }
      })
  }

  signUp() {
    const signUpForm = this.signupForm.value;

    this.auth.SignUp(signUpForm.email, signUpForm.password).then((result) => {
      this.auth.SendVerificationMail(); // Sending email verification notification, when new user registers
      this.snackBar.open('Verification mail sent', '?', {
        duration: 2000
      });
      this.toggleForm();
    }).catch((error) => {
      console.log(error)
      if (error.code == 'auth/email-already-in-use') {
        this.snackBar.open('Email Already in used', '?', {
          duration: 2000
        });
      }
    })
  }


}
