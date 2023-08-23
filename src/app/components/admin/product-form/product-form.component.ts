import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  // product: Product = {
  //   id: '1',
  //   title: 'Dummy Product',
  //   price: 29.99,
  //   category: 'Electronics',
  //   imageUrl: 'https://source.unsplash.com/300x200/?fashion',
  // };
  product: Product = { title: '', price: 0.0, category: '', imageUrl: '' };
  id!: string | null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}
  save(product: Product) {
    if (this.id) {
      this.firebaseService.update('products', this.id, product);
    } else {
      this.firebaseService.create('products', product);
    }
    this.router.navigate(['/admin/products']);
  }
  delete() {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.firebaseService
        .getDocumentByKey('products', this.id)
        .subscribe((p: any) => (this.product = p));
  }
}
