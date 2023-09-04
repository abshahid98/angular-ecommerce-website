import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products!: Observable<Product[]>;
  constructor(private firebaseService: FirebaseService) {
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
  }

  ngOnInit(): void {}
}
