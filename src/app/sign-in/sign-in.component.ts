import { compileDeclareClassMetadata } from '@angular/compiler';
import { Component, inject, NgZone } from '@angular/core';
import { Auth, authState, getAdditionalUserInfo, getRedirectResult, GoogleAuthProvider, signInWithRedirect, UserCredential } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router = inject(Router);
  user$ = authState(this.auth);
  private provider = new GoogleAuthProvider();
  private afAuth: AngularFireAuth = inject(AngularFireAuth)
  
  constructor(private zone: NgZone){}

  verifier :any;

// Sign-In With Google

  login() {
    signInWithRedirect(this.auth, this.provider);
  }

  ngOnInit() {
    // google
    getRedirectResult(this.auth).then((result) => {
      if (!result) { return; }
      if (getAdditionalUserInfo(result as UserCredential)?.isNewUser) {
        this.router.navigate([`register/${result.user.uid}`])
      }
      this.router.navigate([`home/${result.user.uid}`])
    });

    // phone : reCaptcha initialized once
    this.verifier = new RecaptchaVerifier('send-code', { 'size': 'invisible'}, this.auth);

  }


// Sign-In with Email/Password

  email: string = ''
  password: string = ''

  onSubmit() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(user){
          this.router.navigate([`home/${user.uid}`])
        }
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

 
// Sign-In With Phone Number

  phoneNumber: string = '';
  code : string = '';


  onSignInSubmit(event:any) {
    event.preventDefault();
    const verifier = this.verifier
    const confirm = this.afAuth.signInWithPhoneNumber(this.phoneNumber, verifier )
    
    return confirm
  }


  verifyCode(){
    this.onSignInSubmit(event).then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      confirmationResult.confirm(this.code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        if (user){
          this.router.navigate([`home/${user.uid}`])
        }
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
    })
    .catch((error) => {
      // Error; SMS not sent
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
       
   
  }


}

