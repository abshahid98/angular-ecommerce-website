import { Component, OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { Product } from '../../../shared/interfaces/product';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog
  ) {
    console.log(this.activatedRoute.snapshot.url[0]);
  }
  ngOnInit(): void {
    this.showActions =
      this.activatedRoute.snapshot.url[0].path === 'admin' ? false : true;
  }
  addToCart() {
    //console.log(this.product);
    if (this.authService.isLoggedIn()['isLoggedIn']) {
      this.shoppingCartService.addToCart(this.product);
    } else {
      const dialogRef = this.matDialog.open(LoginComponent, {
        data: {
          /* data to pass to the popup if needed */
        },
      });
    }
  }
}
