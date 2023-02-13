import { Component } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc,updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userData !: Observable <any>

  constructor(private firestore: Firestore) { 
    this.getData()
  }

  addData(f:any) {
    //console.log(f.value);
    const userCollection = collection(this.firestore, 'users')
    addDoc(userCollection, f.value).then(() => { 
      console.log("Data added successfully")
    }).catch((err) => {
      console.log(err)
    })
  }


  getData() {
    const userCollection = collection(this.firestore, 'users')
    collectionData(userCollection,{idField: 'id'}).subscribe(data => {
      console.log(data);
    })
    this.userData = collectionData(userCollection,{idField: 'id'})

  }

  updateData(id:any) {
    const docCollection = doc(this.firestore, 'users', id)
    const updateD = {
      name: 'World',
    }
    updateDoc(docCollection, updateD).then(() => {
      console.log("success")
    }).catch((err) => {
      console.log(err);
    })
  }

  deteleData(id: any) {
    const userCollection = doc(this.firestore, 'users',id)
    deleteDoc(userCollection).then(() => {
      console.log("data deleted");
    }).catch((err) => { 
      console.log(err);
    })
  }


}
