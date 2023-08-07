import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'men',
    component: ProductsComponent
  },
      {
    path: 'women',
    component: ProductsComponent
  },
      {
    path: 'kids',
    component: ProductsComponent
  },
      {
    path: 'summer-sale',
    component: ProductsComponent
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
