import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  //private dbPath = '/tutorials';

  //tutorialsRef: AngularFireList<Tutorial>;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {}
  get(collection: string, uid: string) {
    return this.db.object('/' + collection + '/' + uid);
  }
  getAll() {
    return this.db.list('/admins');
  }
  getAdmin(email: string) {
    return this.db.list('/admins/email/' + email);
  }
  getDocumentByKey(collectionName: string, documentKey: string) {
    return this.firestore
      .collection(collectionName)
      .doc(documentKey)
      .valueChanges();
  }
  //   getAll(): AngularFireList<Tutorial> {
  //     return this.tutorialsRef;
  //   }

  //   create(tutorial: Tutorial): any {
  //     return this.tutorialsRef.push(tutorial);
  //   }

  //   update(key: string, value: any): Promise<void> {
  //     return this.tutorialsRef.update(key, value);
  //   }

  //   delete(key: string): Promise<void> {
  //     return this.tutorialsRef.remove(key);
  //   }

  //   deleteAll(): Promise<void> {
  //     return this.tutorialsRef.remove();
  //   }
}

// @Injectable()
// export class ProductService {
//   constructor(private db: AngularFireDatabase) {}

//   create(product) {
//     return this.db.list('/products').push(product);
//   }
//   getAll() {
//     return this.db.list('/products');
//   }
//   get(productId) {
//     return this.db.object('/products/' + productId);
//   }
//   update(productId, product) {
//     return this.db.object('/products/' + productId).update(product);
//   }

//   delete(productId) {
//     return this.db.object('/products/' + productId).remove();
//   }
// }
