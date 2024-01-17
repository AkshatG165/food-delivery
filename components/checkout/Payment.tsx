import Card from '../ui/Card';
import classes from './Payment.module.css';

export default function Payment() {
  return (
    <Card className={classes['payment-details']}>
      <h2>Payment</h2>
    </Card>
  );
}
