import { useContext } from 'react';
import classes from './Cart.module.css';
import Card from '../ui/Card';
import CartItem from './CartItem';
import { CartContext } from '@/store/cart-context';
import Link from 'next/link';

export default function Cart() {
  const cartCtx = useContext(CartContext);

  const cartItms = cartCtx.items.map((item) => (
    <li key={item.id}>
      <CartItem item={item} />
    </li>
  ));

  const cartTotal = cartCtx.items
    .map((item) => item.quantity * item.price)
    .reduce((total, currVal) => total + currVal, 0);
  const gst = cartTotal * 0.07;
  const deliveryCharge = cartCtx.items.length * 20;
  const grandTotal = cartTotal + gst + deliveryCharge;

  return cartCtx.items.length === 0 ? (
    <Card className={classes.empty}>
      Your Cart is Empty!<br></br>
      <Link href="/">Add Items</Link>
    </Card>
  ) : (
    <div className={classes['cart-whole']}>
      <Card className={classes['item-details']}>
        <h2>Your Cart</h2>
        <ul className={classes['cart-list']}>{cartItms}</ul>
      </Card>
      <Card className={classes['price-details']}>
        <h2>Price Details</h2>
        <div>
          <span>Subtotal</span>
          <span>{cartTotal.toFixed(2)}</span>
        </div>
        <div>
          <span>GST</span>
          <span>{gst.toFixed(2)}</span>
        </div>
        <div>
          <span>Delivery Charge</span>
          <span>{deliveryCharge.toFixed(2)}</span>
        </div>
        <div className={classes['grand-total']}>
          <span>Grand Total</span>
          <span>{grandTotal.toFixed(2)}</span>
        </div>
        <Link href="/checkout">Place Order</Link>
      </Card>
    </div>
  );
}
