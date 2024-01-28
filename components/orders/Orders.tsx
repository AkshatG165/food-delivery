import classes from './Orders.module.css';
import Order from '@/model/Order';
import Card from '../ui/Card';
import Link from 'next/link';
import tick from '../../public/green-tick.jpg';

interface OrderWithID extends Order {
  id: string;
}

type Props = {
  orders: OrderWithID[];
};

function getDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return (
    date.toLocaleString().substring(0, 15) + date.toLocaleString().substring(18)
  );
}

export default function Orders({ orders }: Props) {
  const ordersList = orders
    .toSorted((x, y) => {
      return +y.orderDateTime - +x.orderDateTime;
    })
    .map((order) => (
      <li key={order.id}>
        <Card className={classes['order-item']}>
          <div className={classes.heading}>
            <span>
              <b>{getDate(+order.orderDateTime)}</b>
            </span>
            <span>
              {order.isDelivered ? 'Delivered' : 'On the way...'}
              {order.isDelivered && <img src={tick.src} />}
            </span>
          </div>
          <div className={classes.body}>
            <ul>
              {order.items.map((item) => (
                <li key={item.id} className={classes.item}>
                  <span>{item.name} </span>
                  <span>({item.quantity})</span>
                </li>
              ))}
            </ul>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
          <div className={classes.btn}>
            <Link href={``}>Rate</Link>
            <Link href={`/view-orders/${order.id}`}>View Details</Link>
          </div>
        </Card>
      </li>
    ));

  if (orders.length < 1)
    return (
      <Card className={classes.empty}>
        You dont have any orders yet!<br></br>
        <Link href="/">Order Now</Link>
      </Card>
    );

  return (
    <div className={classes.orders}>
      <h2>Orders</h2>
      <ul>{ordersList}</ul>
    </div>
  );
}
