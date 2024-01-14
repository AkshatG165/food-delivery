import classes from './PriceDetails.module.css';
import Card from '../ui/Card';
import Link from 'next/link';

export default function PriceDetails({ cartTotal }: { cartTotal: number }) {
  const gst = cartTotal * 0.07;
  const deliveryCharge = cartTotal > 499 ? 0 : 40;
  const grandTotal = cartTotal + gst + deliveryCharge;

  return (
    <Card className={classes['price-details']}>
      <h2>Price Details</h2>
      <div>
        <span className={classes.text}>Subtotal</span>
        <span>{cartTotal.toFixed(2)}</span>
      </div>
      <div>
        <span className={classes.text}>GST</span>
        <span>{gst.toFixed(2)}</span>
      </div>
      <div>
        <span className={classes.text}>Delivery Charge</span>
        <span className={classes['delivery-charge']}>
          {deliveryCharge === 0 ? 'Free' : deliveryCharge}
        </span>
      </div>
      <div className={classes['grand-total']}>
        <span className={classes.text}>Grand Total</span>
        <span>{grandTotal.toFixed(2)}</span>
      </div>
      <Link href="/checkout">Place Order</Link>
    </Card>
  );
}
