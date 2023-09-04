/** Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import { DataTableModule } from 'angular5-data-table';
// import { HttpModule } from '@angular/http';
import { environment } from 'src/environments/environment';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Spinner2Interceptor } from './components/spinner2/spinner2.interceptor';
import { Spinner2Service } from './components/spinner2/spinner2.service';
import { NgxSpinnerModule } from 'ngx-spinner';
/** firebase */
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

/** Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { Spinner2Component } from './components/spinner2/spinner2.component';

/** Packages */
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductQuantityComponent } from './components/products/product-quantity/product-quantity.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductsComponent,
    ProductCardComponent,
    LoginComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    CheckoutComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    MyOrdersComponent,
    ProductFormComponent,
    SpinnerComponent,
    Spinner2Component,
    SignupComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCardModule,
    // DataTableModule.forRoot(),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    Spinner2Service,
    { provide: HTTP_INTERCEPTORS, useClass: Spinner2Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
