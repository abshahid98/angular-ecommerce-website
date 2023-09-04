import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { OrderDetailsComponent } from '../../order-details/order-details.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders!: Observable<Order[]>;
  constructor(
    private orderService: OrderService,
    private readonly matDialog: MatDialog
  ) {
    this.orders = orderService
      .getOrders()
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
