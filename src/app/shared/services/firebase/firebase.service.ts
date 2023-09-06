import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/shared/models/product';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  getAll(collection: string) {
    return this.firestore.collection(collection);
  }

  create(collection: string, product: Product) {
    return this.firestore.collection(collection).add(product);
  }

  getDocumentByKey(collectionName: string, documentKey: string) {
    return this.firestore
      .collection(collectionName)
      .doc(documentKey)
      .valueChanges();
  }

  update(collectionName: string, id: string, data: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).update(data);
  }

  delete(collectionName: string, id: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(id).delete();
  }
}
