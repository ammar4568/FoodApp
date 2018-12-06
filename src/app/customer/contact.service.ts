import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  emailRoute = 'localhost:3000/email';


  constructor(private afs: AngularFirestore) { }


  submitContact(contactInformation) {
    // this.htp
    // contactInformation.status = 'unread';
    // contactInformation.email = email;
    // return this.afs.collection('contact').add(contactInformation);
  }
}
