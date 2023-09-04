import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    //console.log(itemsMap);

    for (let productId in itemsMap) {
      //console.log(productId);
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, id: productId }));
    }
  }

  getQuantity(product: Product) {
    //console.log(product);
    //console.log(this.itemsMap);

    let item = this.itemsMap[product.id];
    //console.log(item);

    return item ? item.quantity : 0;
    // return 5;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    //console.log(this.itemsMap);
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
