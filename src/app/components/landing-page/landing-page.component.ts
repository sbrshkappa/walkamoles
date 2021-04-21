import { Component, OnInit } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  showSignIn: boolean = false;
  showSignUp: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showSignInModal() {
    console.log("toggle Sign In");
    this.showSignIn = !this.showSignIn;
  }

  showSignUpModal() {
    console.log("toggle Sign Up");
    this.showSignUp = !this.showSignUp;
  }

}
