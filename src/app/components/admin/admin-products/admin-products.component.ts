import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
// import { DataTableModule } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  // products: any[] = [
  //   { name: 'Widget A', price: 19.99 },
  //   { name: 'Gadget B', price: 29.99 },
  //   { name: 'Doodad C', price: 9.99 },
  //   { name: 'Thingamajig D', price: 39.99 },
  //   { name: 'Widget E', price: 15.99 },
  //   { name: 'Gadget F', price: 24.99 },
  //   { name: 'Doodad G', price: 12.99 },
  //   { name: 'Thingamajig H', price: 49.99 },
  //   { name: 'Widget I', price: 34.99 },
  //   { name: 'Gadget J', price: 8.99 },
  //   // ... add more products as needed
  // ];
  // itemsCollection!: AngularFirestoreCollection<Product>;
  products!: Observable<Product[]>;
  //products: Product[] = [];
  constructor(
    private firebaseService: FirebaseService,
    private afs: AngularFirestore
  ) {
    // this.firebaseService.getAll('products').subscribe((products: any[]) => {
    //   this.products = products;
    //   console.log(this.products);
    // });
    // this.itemsCollection = this.afs.collection<Product>('products');

    this.products = this.firebaseService
      .getAll('products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  ngOnInit(): void {}
}
