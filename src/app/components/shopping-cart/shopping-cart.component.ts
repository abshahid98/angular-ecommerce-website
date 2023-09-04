import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from 'src/app/shared/interfaces/shopping-cart-item';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../../shared/interfaces/shopping-cart';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart$!: ShoppingCart;
  private cartSubscription!: Subscription;
  private clearCartSubscription!: Promise<Subscription>;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private readonly matDialog: MatDialog,
    private router: Router
  ) {
    this.cartSubscription = new Subscription();
  }

  async ngOnInit() {
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
  async ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    if (this.clearCartSubscription)
      (await this.clearCartSubscription).unsubscribe();
  }

  checkout() {
    if (this.authService.isLoggedIn()['isLoggedIn']) {
      this.router.navigate(['/checkout']);
    } else {
      const dialogRef = this.matDialog.open(LoginComponent, {
        data: {
          /* data to pass to the popup if needed */
        },
      });
    }
  }

  clearCart() {
    this.clearCartSubscription = this.shoppingCartService.clearCart();
  }
}
