import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { products } from '../../shared/models/products.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

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
    this.firebaseService
      .getAll('products')
      .valueChanges()
      .subscribe((products: any[]) => {
        this.products = products;
        this.applyFilter();
      });
  }
  private applyFilter() {
    this.filteredProducts =
      this.category && this.category != 'home'
        ? this.products.filter((p) => p.category === this.category)
        : this.products;
  }
}
