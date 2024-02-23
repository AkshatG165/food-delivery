import classes from './PriceDetails.module.css';
import Card from '../ui/Card';
import { useRouter } from 'next/router';

type Props = {
  cartTotal: number;
  handleCheckout?: (amount: number) => void;
};

export default function PriceDetails({ cartTotal, handleCheckout }: Props) {
  const router = useRouter();
  const gst = cartTotal * 0.07;
  const deliveryCharge = cartTotal > 499 ? 0 : 40;
  const grandTotal = cartTotal + gst + deliveryCharge;

  function onCheckout() {
    if (router.asPath === '/checkout') {
      const confirm = window.confirm('Are you sure you want to proceed?');
      if (confirm && handleCheckout) handleCheckout(grandTotal);
    } else router.push('/checkout');
  }

  return (
    <Card className={classes['price-details']}>
      <h2>Price Details</h2>
      <div>
        <span className={classes.text}>Subtotal</span>
        <span className={classes.value}>{cartTotal.toFixed(2)}</span>
      </div>
      <div>
        <span className={classes.text}>GST</span>
        <span className={classes.value}>{gst.toFixed(2)}</span>
      </div>
      <div>
        <span className={classes.text}>Delivery Charge</span>
        <span
          className={
            !deliveryCharge ? classes['delivery-charge'] : classes.value
          }
        >
          {deliveryCharge === 0 ? 'Free' : deliveryCharge}
        </span>
      </div>
      <div className={classes['grand-total']}>
        <span className={classes.text}>Grand Total</span>
        <span className={classes.value}>{grandTotal.toFixed(2)}</span>
      </div>
      <button onClick={onCheckout}>
        {router.asPath === '/cart' ? 'Place Order' : 'Checkout'}
      </button>
    </Card>
  );
}
