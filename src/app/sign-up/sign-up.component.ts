import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  email: string = '';
  password: string = '';

  private router = inject(Router);
  private afAuth: AngularFireAuth = inject(AngularFireAuth)

  constructor() {}


  // Signing Up Using Email/Password

  onSubmit() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
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




}
