import { Address } from 'cluster';
import { CartItem } from './CartItem';

export class User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  cartItems: CartItem[];
  addresses: Address[];

  constructor(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean = false,
    cartItems: CartItem[] = [],
    addresses: Address[] = []
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.cartItems = cartItems;
    this.addresses = addresses;
  }
}
