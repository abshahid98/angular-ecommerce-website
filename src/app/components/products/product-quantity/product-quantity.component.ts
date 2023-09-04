import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ShoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {
  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
