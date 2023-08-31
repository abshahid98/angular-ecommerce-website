// import { Product } from '../../interfaces/product';
// import { ShoppingCart } from '../../interfaces/shopping-cart';
// // import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// import { Injectable } from '@angular/core';
// // import 'rxjs/add/operator/take';
// // import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs';
// import { FirebaseService } from '../firebase/firebase.service';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

// @Injectable()
// export class ShoppingCartService {
//   collectionName: string = 'shopping-carts';
//   constructor(
//     private firebaseService: FirebaseService,
//     private firestore: AngularFirestore
//   ) {}

//   async getCart(): Promise<any> {
//     let cartId = await this.getOrCreateCartId();
//     return this.firestore
//       .collection(this.collectionName)
//       .doc(cartId)
//       .collection('items')
//       .valueChanges()
//       .subscribe((x: any) => new ShoppingCart(x.items));
//     // .object('/shopping-carts/' + cartId)
//     // .map((x) => new ShoppingCart(x.items));
//   }

//   async addToCart(product: Product) {
//     this.updateItem(product, 1);
//   }

//   async removeFromCart(product: Product) {
//     this.updateItem(product, -1);
//   }

//   async clearCart() {
//     let cartId = await this.getOrCreateCartId();
//     this.firestore.collection(this.collectionName).doc('cartId').delete();
//   }

//   private create() {
//     return this.firestore
//       .collection(this.collectionName)
//       .add();
//   }

//   // private getItem(cartId: string, productId: string) {
//   //   return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
//   // }

//   private async getOrCreateCartId() {
//     let cartId = localStorage.getItem('cartId');
//     if (cartId) return cartId;

//     let result = await this.create();
//     // localStorage.setItem('cartId', result.key);
//     return result;
//   }

//   private async updateItem(product: Product, change: number) {
//     let cartId = await this.getOrCreateCartId();
//     // let item$ = this.getItem(cartId, product.id);
//     // item$.take(1).subscribe((item) => {
//     //   let quantity = (item.quantity || 0) + change;
//     //   if (quantity === 0) item$.remove();
//     //   else
//     //     item$.update({
//     //       title: product.title,
//     //       imageUrl: product.imageUrl,
//     //       price: product.price,
//     //       quantity: quantity,
//     //     });
//     // });
//   }
// }
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../../interfaces/product';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private firestore: AngularFirestore) {}

  getShoppingCartCollection(): AngularFirestoreCollection<any> {
    const cartId = this.getOrCreateCartId();
    //const cartId = 'JOCZseyA2BtXj1JMbceu';
    return this.firestore.collection(`shopping-carts/${cartId}/items`);
  }
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private createCart() {
    return this.firestore.collection('shopping-carts').add({});
  }
  private getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    } else {
      return this.createCart().then((ref) => {
        const newCartId = ref.id;
        localStorage.setItem('cartId', newCartId);
        return newCartId;
      });
    }
  }
  // Create a new item in the shopping cart
  createCartItem(itemId: string, item: Partial<ShoppingCartItem>) {
    return this.getShoppingCartCollection().doc(itemId).set(item);
  }

  // Get all items in the shopping cart
  getCartItems(): Observable<Product[]> {
    return this.getShoppingCartCollection().valueChanges();
  }

  // Update an item's quantity in the shopping cart
  updateCartItem(
    itemId: string,
    changes: Partial<ShoppingCartItem>
  ): Promise<void> {
    return this.getShoppingCartCollection().doc(itemId).update(changes);
  }

  // Remove an item from the shopping cart
  removeCartItem(itemId: string): Promise<void> {
    return this.getShoppingCartCollection().doc(itemId).delete();
  }

  // Clear the entire shopping cart
  async clearCart() {
    console.log('Clearing shopping cart');
    // const cartId = await this.getOrCreateCartId();
    //console.log(cartId);
    //return this.firestore.doc('shopping-carts/GLLWH8XYkbqVbfv8QuDM').delete();
    return this.getShoppingCartCollection()
      .snapshotChanges()
      .subscribe((actions) => {
        // Process the actions and add the document ID as the itemId
        actions.forEach(async (action) => {
          await this.removeCartItem(action.payload.doc.id);
        });
      });
    // try {

    //   // await Promise.all(deletePromises);

    //   // Delete parent document
    //   // const cartDocRef = this.firestore.doc(`shopping-carts/${cartId}`);
    //   // await cartDocRef.delete();

    //   console.log('Cart and its subcollection items deleted successfully.');
    // } catch (error) {
    //   console.error('Error deleting cart:', error);
    // }
  }
  addItem(item: Product) {
    const cartId = this.getOrCreateCartId(); // Get or create the cart ID

    return this.getShoppingCartCollection()
      .add(item) // Add the item to the cart collection
      .then((docRef) => {
        // If the item is added successfully, update its cartId field
        return docRef.update({ cartId });
      });
  }

  // Get a specific item from the shopping cart
  private getItem(cartId: string, itemId: string) {
    return this.firestore
      .doc<ShoppingCartItem>(`shopping-carts/${cartId}/items/${itemId}`)
      .valueChanges();
  }

  // Update an item's quantity in the shopping cart
  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    console.log(cartId);
    const item$ = this.getItem(cartId, product.id);
    console.log(product.id);

    item$.pipe(take(1)).subscribe((item) => {
      const quantity = (item?.quantity || 0) + change;
      console.log(quantity);

      if (quantity === 0) {
        console.log('if');

        // Remove the item if the quantity becomes zero
        this.removeCartItem(product.id);
      } else if (quantity === 1) {
        console.log('if 1');

        this.createCartItem(product.id, {
          //key: product.id,
          quantity: quantity,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
        });
      } else {
        console.log('else');
        // Update the item's quantity and other details
        this.updateCartItem(product.id, {
          //key: product.id,
          quantity: quantity,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
        });
      }
    });
  }
}
