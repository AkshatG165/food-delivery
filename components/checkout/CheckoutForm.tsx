import { useRouter } from 'next/router';
import classes from './CheckoutForm.module.css';
import { Address as AddressModel } from '@/model/Address';
import PriceDetails from '../cart/PriceDetails';
import Address from './Address';
import Payment from './Payment';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/store/cart-context';

type Props = {
  addresses: AddressModel[];
};

export default function CheckoutForm({ addresses }: Props) {
  const router = useRouter();
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    if (cartCtx.items.length < 1) router.replace('/view-cart');
  }, []);

  const cartTotal = cartCtx.items
    .map((item) => item.quantity * item.price)
    .reduce((total, currVal) => total + currVal, 0);

  return (
    <div className={classes['checkout-page']}>
      <div className={classes['confirm-details']}>
        <Address addresses={addresses} />
        <Payment />
      </div>
      <PriceDetails cartTotal={cartTotal} />
    </div>
  );
}
