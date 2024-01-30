import classes from './OrderDetails.module.css';
import Card from '../ui/Card';
import Order from '@/model/Order';
import tick from '../../public/green-tick.jpg';

function getDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return (
    date.toLocaleString().substring(0, 15) + date.toLocaleString().substring(18)
  );
}

export default function OrderDetails({ order }: { order: Order }) {
  const cartTotal = order.items
    .map((item) => item.quantity * item.price)
    .reduce((total, currVal) => total + currVal, 0);
  const gst = cartTotal * 0.07;
  const deliveryCharge = cartTotal > 499 ? 0 : 40;

  const itemList = order.items.map((item) => (
    <li key={item.id} className={classes.item}>
      <div className={classes.left}>
        <span>{item.name} - </span>
        <span>${item.price} x </span>
        <span>{item.quantity}</span>
      </div>
      <div className={classes.right}>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </li>
  ));

  return (
    <Card className={classes['order-details']}>
      <h3>Order Details</h3>
      <div className={classes.item + ' ' + classes['date-img']}>
        <span>{getDate(+order.orderDateTime)}</span>
        <span>
          {order.isDelivered ? 'Delivered' : 'On the way...'}
          {order.isDelivered && <img src={tick.src} />}
        </span>
      </div>
      <div className={classes.address}>
        <div>
          <b>Name - </b>
          <span>{order.shippingAddress!.name}</span>
        </div>
        <div>
          <b>Address - </b>
          <span>{order.shippingAddress!.address}, </span>
          <span>{order.shippingAddress!.city}, </span>
          <span>{order.shippingAddress!.state} - </span>
          <span>{order.shippingAddress!.pincode}</span>
        </div>
        <div>
          <b>Mobile No. - </b>
          <span>{order.shippingAddress!.mobile} </span>
        </div>
      </div>
      <div className={classes['bill-details']}>
        <h3>Bill</h3>
        <ul>{itemList}</ul>
        <b className={classes.item}>
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </b>
        <div className={classes.item}>
          <span>GST</span>
          <span>${gst.toFixed(2)}</span>
        </div>
        <div className={classes.item}>
          <span>Delivery Charge</span>
          <span>${deliveryCharge.toFixed(2)}</span>
        </div>
        <b className={classes.item + ' ' + classes.total}>
          <span>Total Paid via {order.paymentMethod}</span>
          <span>${order.totalPrice.toFixed(2)}</span>
        </b>
      </div>
    </Card>
  );
}
