import { CartItem } from './CartItem';
import { Address } from './Address';

export default class Order {
  userEmail: string;
  items: CartItem[];
  shippingAddress: Address | undefined;
  totalPrice: number;
  paymentMethod: string;
  paymentResult: { id: string; status: string };
  isDelivered: boolean;
  orderDateTime: Date;
  deliveredAt: Date | null;
  id?: string;

  constructor(
    userEmail: string,
    items: CartItem[],
    shippingAddress: Address,
    totalPrice: number,
    paymentMethod: string,
    paymentResult: { id: string; status: string },
    orderDateTime: Date,
    isDelivered: boolean,
    deliveredAt: Date | null,
    id?: string
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
    this.id = id;
  }
}
