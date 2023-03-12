import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  title = 'Ng-App';
  
  constructor(){}
  private router = inject(Router);
  private firestore: AngularFirestore = inject(AngularFirestore);
  private afAuth: AngularFireAuth = inject(AngularFireAuth)
  
  
  items:any = this.firestore.collection('users').valueChanges('uid')

  ngOnInit() {
    console.log(this.items)

  }


   // SignOut 
  
   onLogout() {
    this.afAuth.signOut()
      .then(() => {
        // Sign-out successful.
        this.router.navigate([`sign-in`])
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      });
  }





}
