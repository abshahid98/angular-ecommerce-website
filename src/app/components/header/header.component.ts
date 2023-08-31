import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
// import { PopupService } from '../../shared/services/popup.service';
import { AppUser } from '../../shared/interfaces/app-user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
// import { Router, NavigationStart } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { SignupComponent } from '../signup/signup.component';
import { ShoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/shared/interfaces/shopping-cart-item';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //public appUser!: Boolean;
  //public isAdmin: Boolean = true;
  cart$!: ShoppingCart;
  private cartSubscription!: Subscription;
  selected_header = 'home';
  @Input('appUser') appUser!: { [key: string]: any };
  constructor(
    // private popupService: PopupService,

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
    // router.events.forEach((event) => {
    //   if (event instanceof NavigationStart) {
    //     setTimeout(() => {
    //       this.appUser = this.authService.isLoggedIn();
    //       console.log(this.appUser);
    //     }, 500);
    //     // this.appUser = this.myfunc();
    //     // console.log(this.appUser);
    //   }
    //   // NavigationEnd
    //   // NavigationCancel
    //   // NavigationError
    //   // RoutesRecognized
    // });
  }

  myfunc() {
    return this.authService.isLoggedIn();
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
    //this.popupService.openPopup();
    const dialogRef = this.matDialog.open(LoginComponent, {
      data: {
        /* data to pass to the popup if needed */
      },
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.popupService.closePopup();
    // });
  }
  openSignupPopup() {
    //this.popupService.openPopup();
    const dialogRef = this.matDialog.open(SignupComponent, {
      data: {
        /* data to pass to the popup if needed */
      },
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.popupService.closePopup();
    // });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  goTo(view: string, params: number = 0) {
    this.router.navigate([view], { state: { params: params } });
  }
}
