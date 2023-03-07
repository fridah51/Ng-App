import { Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Ng-App';
  
  constructor(){}

  private firestore: AngularFirestore = inject(AngularFirestore);

  
  items:any = this.firestore.collection('users').valueChanges('uid')

  ngOnInit() {
    console.log(this.items)

  }


}
