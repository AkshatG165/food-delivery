import { Item } from './Item';
import { User } from './User';

export default class Order {
  user: User;
  items: Item[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
  paymentMethod: string;
  paymentResult: { id: string; status: string; email: string };
  isDelivered: boolean;
  orderDateTime: Date;
  deliveredAt: Date;

  constructor(
    user: User,
    items: Item[],
    shippingAddress: {
      fullName: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    },
    totalPrice: number,
    paymentMethod: string,
    paymentResult: { id: string; status: string; email: string },
    isDelivered: boolean,
    orderDateTime: Date,
    deliveredAt: Date
  ) {
    this.user = user;
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
