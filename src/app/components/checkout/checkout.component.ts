import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { ShoppingCartItem } from 'src/app/shared/interfaces/shopping-cart-item';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cart$!: ShoppingCart;
  private cartSubscription!: Subscription;
  constructor(private shoppingCartService: ShoppingCartService) {
    this.cartSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.cartSubscription = this.shoppingCartService
      .getShoppingCartCollection()
      .snapshotChanges()
      .subscribe((actions) => {
        const cartItems: { [itemId: string]: any } = {};

        // Process the actions and add the document ID as the itemId
        actions.forEach((action) => {
          const data = action.payload.doc.data() as ShoppingCartItem;
          data.id = action.payload.doc.id;
          cartItems[data.id] = data; // Include the document ID as a field
        });

        this.cart$ = new ShoppingCart(cartItems);
      });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
