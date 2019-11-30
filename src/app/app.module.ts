import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MaterialModule } from './Modules/material.module';
import { LoginComponent } from './Components/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './Components/home/home.component';

const firebaseConfig = {
  apiKey: "AIzaSyBDmTfk0uuglgbKyPduNF2muxWQCq_Ocbc",
  authDomain: "expensemanager13.firebaseapp.com",
  databaseURL: "https://expensemanager13.firebaseio.com",
  projectId: "expensemanager13",
  storageBucket: "expensemanager13.appspot.com",
  messagingSenderId: "785359625790",
  appId: "1:785359625790:web:152ea396b947c057193b6f",
  measurementId: "G-VTZKYWVJZH"
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
