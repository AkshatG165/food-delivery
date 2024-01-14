import { useContext, useEffect } from 'react';
import classes from './Cart.module.css';
import Card from '../ui/Card';
import CartItem from './CartItem';
import { CartContext } from '@/store/cart-context';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import PriceDetails from './PriceDetails';

let dataUpdated = false;

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const { data: session } = useSession();

  useEffect(() => {
    if (
      session &&
      session.user.cartItems?.length > 0 &&
      dataUpdated === false
    ) {
      session?.user.cartItems.forEach((item) => cartCtx.addItem(item));
      dataUpdated = true;
    }
  }, [session]);

  const cartItems = cartCtx.items.map((item) => (
    <li key={item.id}>
      <CartItem item={item} />
    </li>
  ));

  const cartTotal = cartCtx.items
    .map((item) => item.quantity * item.price)
    .reduce((total, currVal) => total + currVal, 0);

  return cartCtx.items.length === 0 ? (
    <Card className={classes.empty}>
      Your Cart is Empty!<br></br>
      <Link href="/">Add Items</Link>
    </Card>
  ) : (
    <div className={classes['cart-whole']}>
      <Card className={classes['item-details']}>
        <h2>Your Cart</h2>
        <ul className={classes['cart-list']}>{cartItems}</ul>
      </Card>
      <PriceDetails cartTotal={cartTotal} />
    </div>
  );
}
