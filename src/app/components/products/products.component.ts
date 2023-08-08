import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { products } from '../../shared/models/products.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.extractCategoryFromRoute();
    this.populateProducts();
  }

  private extractCategoryFromRoute(): string {
    const urlSegments = this.activatedRoute.snapshot.url;
    if (urlSegments.length > 0) {
      // Assuming the category is the first segment in the URL
      return urlSegments[0].path;
    }
    return '';
  }

  private populateProducts() {
    this.products = products;
    console.log(this.category);
    this.filteredProducts =
      this.category && this.category != 'home'
        ? this.products.filter((p) => p.category === this.category)
        : this.products;
  }
}
