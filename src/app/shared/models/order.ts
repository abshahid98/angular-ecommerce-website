import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: {};
  orderAmount: number = 0;
  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();
    this.orderAmount = shoppingCart.totalPrice;
    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
  toFirestoreObject() {
    return {
      userId: this.userId,
      orderAmount: this.orderAmount,
      shipping: this.shipping,
      datePlaced: this.datePlaced,
      items: this.items,
    };
  }
}
