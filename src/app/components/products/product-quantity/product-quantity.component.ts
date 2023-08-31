import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    //console.log(this.product);
    this.shoppingCartService.addToCart(this.product);
    //let item$ = this.db.list('shopping-carts');
    // console.log(
    //   this.shoppingCartService.getCartItems().subscribe((p) => console.log(p))
    // );
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
