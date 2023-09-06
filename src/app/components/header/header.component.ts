import { Component, OnInit, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { SignupComponent } from '../signup/signup.component';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart$!: ShoppingCart;
  private cartSubscription!: Subscription;
  selected_header = 'home';
  @Input('appUser') appUser!: { [key: string]: any };
  constructor(
    private authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private readonly matDialog: MatDialog
  ) {
    this.cartSubscription = new Subscription();
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.selected_header = event
          ? event.url.split('/')[1]
          : this.selected_header;
      }
    });
  }

  ngOnInit(): void {
    this.selected_header = window.location.pathname.split('/')[1];
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

  openLoginPopup() {
    const dialogRef = this.matDialog.open(LoginComponent, {
      data: {
        /* data to pass to the popup if needed */
      },
    });
  }

  openSignupPopup() {
    const dialogRef = this.matDialog.open(SignupComponent, {
      data: {
        /* data to pass to the popup if needed */
      },
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  goTo(view: string, params: number = 0) {
    this.router.navigate([view], { state: { params: params } });
  }
}
