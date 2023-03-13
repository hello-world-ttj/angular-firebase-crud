import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage,ref,uploadBytesResumable,getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userData !: Observable<any>
  
  file: any
  
  imageUrl:any

  constructor(private firestore: Firestore, private store: Storage) { 
    this.getData()
  }

  addData(f:any) {
    //console.log(f.value);
    let data = {
      values: f.value,
      img:this.imageUrl
    }
    const userCollection = collection(this.firestore, 'users')
    addDoc(userCollection, data).then(() => { 
      console.log("Data added successfully")
    }).catch((err) => {
      console.log(err)
    })
    f.value = ''
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

  upFile(event: any) {
    this.file = event.target.files[0]
    // console.log(this.file)
  }

  addFile() {
    console.log(this.file.name)
    const storageRef = ref(this.store, this.file.name)
    const uploadImg = uploadBytesResumable(storageRef, this.file)
    uploadImg.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (err) => {
        console.log(err)
      },
      () => {
        getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.imageUrl=downloadURL
        });
      }
    )
  }

}
