import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  sendOTP(){
    this.auth.resetPassword(this.email);
    // this.auth.SignUp(this.email, this.password);
    this.auth.SignIn(this.email, this.password);
    this.auth.isLoggedIn();
  }

  signOut(){
    console.log(this.auth.SignOut());
  }

  
}
