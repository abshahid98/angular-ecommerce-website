import { Component, OnInit } from '@angular/core';
// import { DataTableModule } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [
    { name: 'Widget A', price: 19.99 },
    { name: 'Gadget B', price: 29.99 },
    { name: 'Doodad C', price: 9.99 },
    { name: 'Thingamajig D', price: 39.99 },
    { name: 'Widget E', price: 15.99 },
    { name: 'Gadget F', price: 24.99 },
    { name: 'Doodad G', price: 12.99 },
    { name: 'Thingamajig H', price: 49.99 },
    { name: 'Widget I', price: 34.99 },
    { name: 'Gadget J', price: 8.99 },
    // ... add more products as needed
  ];
  constructor() {}

  ngOnInit(): void {}
}
