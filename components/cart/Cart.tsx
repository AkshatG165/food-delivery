import { useEffect, useState } from 'react';
import classes from './Cart.module.css';
import Card from '../ui/Card';
import CartItem from './CartItem';
import Link from 'next/link';
import PriceDetails from './PriceDetails';
import { CartItem as CartItemModel } from '@/model/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { addItem, removeItem } from '@/store/cart-slice';
import { showNotification } from '@/store/notification-slice';

let dataRetrieved = false;
let cartItem: CartItemModel | undefined;

export default function Cart({ cartItems }: { cartItems: CartItemModel[] }) {
  const cartCtx = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  //initializing cart context
  useEffect(() => {
    if (cartCtx.length < 1 && cartItems?.length > 0 && !dataRetrieved) {
      cartItems.forEach((item) => dispatch(addItem(item)));
      dataRetrieved = true;
    }
  }, []);

  //for updating data
  useEffect(() => {
    const updateItemsInDB = async () => {
      const res = await fetch('/api/user/update-cart', {
        method: 'PATCH',
        body: JSON.stringify({ cartItems: cartCtx }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!res.ok) {
        dispatch(removeItem(cartItem));
        dispatch(
          showNotification({
            type: 'failure',
            message: 'Unable to update cart, try again after some time',
          })
        );
      }
    };
    if (cartItem) updateItemsInDB();
    cartItem = undefined;
  }, [cartCtx]);

  function onItemAdd(item: CartItemModel) {
    cartItem = item;
    dispatch(addItem(item));
  }

  function onItemRemove(item: CartItemModel) {
    cartItem = item;
    dispatch(removeItem(item));
  }

  const renderCartItems = cartCtx.map((item) => (
    <li key={item.id}>
      <CartItem item={item} onItemAdd={onItemAdd} onItemRemove={onItemRemove} />
    </li>
  ));

  const cartTotal = cartCtx
    .map((item) => item.quantity * item.price)
    .reduce((total, currVal) => total + currVal, 0);

  return cartCtx.length === 0 ? (
    <Card className={classes.empty}>
      Your Cart is Empty!<br></br>
      <Link href="/">Add Items</Link>
    </Card>
  ) : (
    <div className={classes['cart-whole']}>
      <Card className={classes['item-details']}>
        <h2>Your Cart</h2>
        <ul className={classes['cart-list']}>{renderCartItems}</ul>
      </Card>
      <PriceDetails cartTotal={cartTotal} />
    </div>
  );
}
