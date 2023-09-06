import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHNotificationService } from 'ih-ng-notification';
import { Order } from 'src/app/shared/models/order';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
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
  userId!: string;

  constructor(
    private router: Router,
    private jwt: JwtService,
    private readonly notificationService: IHNotificationService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userId = this.jwt.getUserId();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    const orderData = order.toFirestoreObject();
    let result = await this.orderService.placeOrder(orderData);
    this.notificationService.success('Order Placed Successfully!!', '', true, {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
    this.router.navigate(['/my/orders']);
  }
}
