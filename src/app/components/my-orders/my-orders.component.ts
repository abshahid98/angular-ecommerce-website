import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { JwtService } from 'src/app/shared/services/jwt/jwt.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  userId!: string;
  orders!: Observable<Order[]>;
  constructor(
    private orderService: OrderService,
    private readonly matDialog: MatDialog,
    private jwt: JwtService
  ) {
    this.userId = this.jwt.getUserId();
    this.orders = orderService
      .getOrdersByUser(this.userId)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Order;
            return data;
          });
        })
      );
  }

  ngOnInit(): void {}
  openOrderPopup(order: Order) {
    const dialogRef = this.matDialog.open(OrderDetailsComponent, {
      data: {
        order,
      },
    });
  }
}
