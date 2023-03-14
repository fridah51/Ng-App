import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  private afAuth: AngularFireAuth = inject(AngularFireAuth)

  email :string = ''

  // Reset Forgot password
  ForgotPassword() {
    return this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        console.log('sent')
        window.alert('Password reset Email sent, check your inbox.');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        window.alert(errorMessage);
      });
  }








}
