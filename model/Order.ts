import { Item } from './Item';
import { Address } from './Address';

export default class Order {
  userEmail: string;
  items: Item[];
  shippingAddress: Address;
  totalPrice: number;
  paymentMethod: string;
  paymentResult: { id: string; status: string };
  isDelivered: boolean;
  orderDateTime: Date;
  deliveredAt: Date;

  constructor(
    userEmail: string,
    items: Item[],
    shippingAddress: Address,
    totalPrice: number,
    paymentMethod: string,
    paymentResult: { id: string; status: string; email: string },
    isDelivered: boolean,
    orderDateTime: Date,
    deliveredAt: Date
  ) {
    this.userEmail = userEmail;
    this.items = items;
    this.shippingAddress = shippingAddress;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.paymentResult = paymentResult;
    this.isDelivered = isDelivered;
    this.orderDateTime = orderDateTime;
    this.deliveredAt = deliveredAt;
  }
}
