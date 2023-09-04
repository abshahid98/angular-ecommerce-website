import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order';
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
  // orders = [
  //   {
  //     shipping: { name: 'John Doe' },
  //     datePlaced: '2023-08-01T10:30:00Z',
  //   },
  //   {
  //     shipping: { name: 'Jane Smith' },
  //     datePlaced: '2023-08-05T14:45:00Z',
  //   },
  //   {
  //     shipping: { name: 'Michael Johnson' },
  //     datePlaced: '2023-08-10T09:15:00Z',
  //   },
  //   // ... more orders
  // ];
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
