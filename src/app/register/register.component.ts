import { Component, inject } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { finalize, map, Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private firestore: AngularFirestore = inject(AngularFirestore);
  private firest: Firestore = inject(Firestore);
  private router = inject(Router);
  private afAuth: AngularFireAuth = inject(AngularFireAuth)
  private auth: Auth = inject(Auth);
  user$ = authState(this.auth);
  private storage: AngularFireStorage = inject(AngularFireStorage)


  fname:string ='';
  lname:string ='';
  pic:string ='';
  
  downloadURL: any;

  ngOnInit() {}


// Upload photo

  onFileSelected(event:any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `myImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`myImages/${n}`, file);
    task.snapshotChanges().pipe(finalize(() => 
        {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url:any) => {
            if (url) {
              this.pic = url;
            }
            console.log(this.pic);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }



  // Submit Register Form data to FireStore

  async onSubmit() {
    const user = await this.auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = doc(this.firest, `users/${uid}`)
      await setDoc(userRef, 
        {
          fname:this.fname ,
          lname:this.lname,
          photo:this.pic
        }, { merge: true });
       
        
      this.router.navigate([`home/${uid}`])
    }

  }


  

}
