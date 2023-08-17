import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    $key: '1',
    title: 'Dummy Product',
    price: 29.99,
    category: 'Electronics',
    imageUrl: 'https://via.placeholder.com/300x200?text=Dummy+Product',
  };

  constructor() {}
  save() {}
  delete() {}
  ngOnInit(): void {}
}
