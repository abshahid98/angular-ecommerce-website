import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { Product } from '../../../shared/interfaces/product';

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
    private shoppingCartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(this.activatedRoute.snapshot.url[0]);
  }
  ngOnInit(): void {
    this.showActions =
      this.activatedRoute.snapshot.url[0].path === 'admin' ? false : true;
  }
  addToCart() {
    //console.log(this.product);
    this.shoppingCartService.addToCart(this.product);
  }
}
