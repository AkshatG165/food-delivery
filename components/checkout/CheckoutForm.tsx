import { useRouter } from 'next/router';
import classes from './CheckoutForm.module.css';
import { Address as AddressModel } from '@/model/Address';
import PriceDetails from '../cart/PriceDetails';
import Address from './Address';
import Payment from './Payment';

type Props = {
  addresses: AddressModel[];
};

export default function CheckoutForm({ addresses }: Props) {
  const router = useRouter();
  const query = router.query;

  return (
    <div className={classes['checkout-page']}>
      <div className={classes['confirm-details']}>
        <Address addresses={addresses} />
        <Payment />
      </div>
      <PriceDetails cartTotal={query.cartTotal ? +query.cartTotal : 0} />
    </div>
  );
}
