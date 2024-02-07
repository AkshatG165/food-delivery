import { useContext, useEffect, useState } from 'react';
import classes from './Cart.module.css';
import Card from '../ui/Card';
import CartItem from './CartItem';
import { CartContext } from '@/store/cart-context';
import Link from 'next/link';
import PriceDetails from './PriceDetails';
import { CartItem as CartItemModel } from '@/model/CartItem';
import { useSession } from 'next-auth/react';
import LoadingUI from '../ui/LoadingUI';

let dataRetrieved = false;
let cartItem: CartItemModel | undefined;

export default function Cart() {
  const { data: session } = useSession();
  const cartCtx = useContext(CartContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  //for retreving data
  useEffect(() => {
    const getCartItems = async () => {
      const res = await fetch(`/api/user?email=${session?.user?.email}`);
      if (!res.ok)
        setError(
          'Unable to fetch cart items, please try again after some time'
        );
      else {
        const cartItems: CartItemModel[] = (await res.json()).result[0]
          .cartItems;
        if (cartItems.length > 0 && !dataRetrieved) {
          cartItems.forEach((item) => cartCtx.addItem(item));
          dataRetrieved = true;
        }
      }
      setIsLoading(false);
    };
    if (!dataRetrieved) getCartItems();
    else setIsLoading(false);
  }, []);

  //for updating data
  useEffect(() => {
    const updateItemsInDB = async () => {
      const res = await fetch('/api/user/update-cart', {
        method: 'PATCH',
        body: JSON.stringify({ cartItems: cartCtx.items }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!res.ok) {
        cartCtx.removeItem(cartItem as CartItemModel);
        setError('Unable to update cart, try again after some time.');
      }
    };
    if (cartItem) updateItemsInDB();
    cartItem = undefined;
  }, [cartCtx.items]);

  function onItemAdd(item: CartItemModel) {
    cartItem = item;
    cartCtx.addItem(item);
  }

  function onItemRemove(item: CartItemModel) {
    cartItem = item;
    cartCtx.removeItem(item);
  }

  const cartItems = cartCtx.items.map((item) => (
    <li key={item.id}>
      <CartItem item={item} onItemAdd={onItemAdd} onItemRemove={onItemRemove} />
    </li>
  ));

  const cartTotal = cartCtx.items
    .map((item) => item.quantity * item.price)
    .reduce((total, currVal) => total + currVal, 0);

  if (isLoading) return <LoadingUI />;

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
