import Order from '@/model/Order';
import Card from '../ui/Card';

interface OrderWithID extends Order {
  id: string;
}

type Props = {
  orders: OrderWithID[];
};

export default function Orders({ orders }: Props) {
  const ordersList = orders.map((order) => (
    <li key={order.id}>
      <Card>
        <p>{order.id}</p>
      </Card>
    </li>
  ));

  return (
    <>
      <h3>Orders Page</h3>
      <ul>{ordersList}</ul>
    </>
  );
}
