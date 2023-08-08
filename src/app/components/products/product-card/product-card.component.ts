import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  
  @Input('product') product!: Product;

  constructor() { }

  addToCart() {
  }
}
