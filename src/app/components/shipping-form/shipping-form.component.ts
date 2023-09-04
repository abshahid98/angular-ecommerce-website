import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order';
import { ShoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { JwtService } from 'src/app/shared/services/jwt/jwt.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart!: ShoppingCart;
  shipping = { name: '', email: '', number: '', address: '' };
  //userSubscription!: Subscription;
  userId!: string;
  constructor(
    private router: Router,
    private jwt: JwtService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userId = this.jwt.getUserId();
  }
  // ngOnDestroy() {
  //   this.userSubscription.unsubscribe();
  // }

  async placeOrder() {
    //console.log(this.shipping);
    let order = new Order(this.userId, this.shipping, this.cart);
    const orderData = order.toFirestoreObject();
    let result = await this.orderService.placeOrder(orderData);
    this.router.navigate(['/my/orders']);
  }
}
