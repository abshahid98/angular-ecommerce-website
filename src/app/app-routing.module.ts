import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'men',
    component: ProductsComponent,
  },
  {
    path: 'women',
    component: ProductsComponent,
  },
  {
    path: 'kids',
    component: ProductsComponent,
  },
  {
    path: 'summer-sale',
    component: ProductsComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
