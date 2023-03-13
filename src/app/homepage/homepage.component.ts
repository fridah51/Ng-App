import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  title = 'Ng-App';
  
  private router = inject(Router);
  private firestore: AngularFirestore = inject(AngularFirestore);
  private afAuth: AngularFireAuth = inject(AngularFireAuth)
  private route:ActivatedRoute = inject(ActivatedRoute);


  uid  = String(this.route.snapshot.paramMap.get('uid'));
  items$:any ;
  data:any;

  constructor(){
    this.items$ = this.firestore.collection('users').doc(this.uid).valueChanges();
    this.items$.subscribe((data :any) => 
    {
      this.data = data
      console.log(data); 
    });
  }

  ngOnInit() {
   
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
