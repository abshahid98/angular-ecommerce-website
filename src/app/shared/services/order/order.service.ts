import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private firestore: AngularFirestore,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order: any) {
    console.log(order);
    let result = await this.firestore.collection('orders').add(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.firestore.collection('orders');
  }

  getOrdersByUser(userId: string) {
    return this.firestore.collection(
      'orders',
      (ref) => ref.where('userId', '==', userId) // Filter by userId
    ); // Use `valueChanges()` to get an observable of the filtered order documents.
  }
}
