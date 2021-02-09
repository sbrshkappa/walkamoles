import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore, //Inject Firestore service
    public afAuth: AngularFireAuth, //Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone //NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when logged in and setting up null when logged out */

    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

   // Sign in with email/password
   signIn(email, password) {
     return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      })
   }

   // Sign up with email/password
   signUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the sendVerification() function when new user sign's up and  returns a promise */
        this.sendVerificationEmail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
   }

   // Send email verification when new user signs up
   sendVerificationEmail() {
     return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
   }

   //Reset Forgot Password
   forgotPassword(passwordResetEmail) {
     return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      })
   }

   //returns true when the user is logged in and email is verified
   get isLoggedIn(): boolean {
     const user = JSON.parse(localStorage.getItem('user'));
     return (user !== null && user.emailVerified !== false) ? true : false;
   }

   //Sign in with Google
   googleAuth() {
     return this.authLogin(new firebase.auth.GoogleAuthProvider());
   }

   //Authentication for each provider - decoupled from the provider
   authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      })
   }

   /* Setting up user data when signing in with email or google */
   setUserData(user) {
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
     const userData: User = {
       uid: user.uid,
       email: user.email,
       displayName: user.displayName,
       photoURL: user.photoURL,
       emailVerified: user.emailVerified
     }

     return userRef.set(userData, {
       merge: true
     })
   }

   // Sign out
   signOut() {
     return this.afAuth.signOut().then(() => {
       localStorage.removeItem('user');
       this.router.navigate(['sign-in']);
     })
   }


}
