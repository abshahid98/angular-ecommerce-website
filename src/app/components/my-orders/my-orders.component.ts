import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders = [
    {
      shipping: { name: 'John Doe' },
      datePlaced: '2023-08-01T10:30:00Z',
    },
    {
      shipping: { name: 'Jane Smith' },
      datePlaced: '2023-08-05T14:45:00Z',
    },
    {
      shipping: { name: 'Michael Johnson' },
      datePlaced: '2023-08-10T09:15:00Z',
    },
    // ... more orders
  ];
  constructor() {}

  ngOnInit(): void {}
}
