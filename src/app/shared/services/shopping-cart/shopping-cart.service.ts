import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../../interfaces/product';
import { ShoppingCartItem } from '../../interfaces/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private firestore: AngularFirestore) {}

  getShoppingCartCollection(): AngularFirestoreCollection<any> {
    const cartId = this.getOrCreateCartId();
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
    return this.getShoppingCartCollection()
      .snapshotChanges()
      .subscribe((actions) => {
        actions.forEach(async (action) => {
          await this.removeCartItem(action.payload.doc.id);
        });
      });
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
    const item$ = this.getItem(cartId, product.id);
    item$.pipe(take(1)).subscribe((item) => {
      const quantity = (item?.quantity || 0) + change;
      if (quantity === 0) {
        // Remove the item if the quantity becomes zero
        this.removeCartItem(product.id);
      } else if (quantity === 1) {
        this.createCartItem(product.id, {
          quantity: quantity,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
        });
      } else {
        this.updateCartItem(product.id, {
          quantity: quantity,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
        });
      }
    });
  }
}
