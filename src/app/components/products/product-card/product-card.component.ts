import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { Product } from '../../../shared/models/product';

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
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.showActions = this.authService.isLoggedIn()['isAdmin'] ? false : true;
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
}
