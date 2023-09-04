import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/shared/interfaces/shopping-cart-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Observable<Product[]>;
  filteredProducts!: Observable<Product[]>;
  cart$!: ShoppingCart;
  private cartSubscription!: Subscription;
  category: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private firebaseService: FirebaseService
  ) {
    this.cartSubscription = new Subscription();
  }

  ngOnInit() {
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
    this.category = this.extractCategoryFromRoute();
    this.populateProducts();
  }

  private extractCategoryFromRoute(): string {
    const urlSegments = this.activatedRoute.snapshot.url;
    if (urlSegments.length > 0) {
      return urlSegments[0].path;
    }
    return '';
  }

  private populateProducts() {
    this.products = this.firebaseService
      .getAll('products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Product;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    this.applyFilter();
  }

  private applyFilter() {
    this.filteredProducts = this.products.pipe(
      map((products) => {
        if (this.category && this.category !== 'home') {
          return products.filter((p) => p.category === this.category);
        } else {
          return products;
        }
      })
    );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
