import Orders from '@/components/orders/Orders';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { connectToDB, getCollection } from '@/util/db';
import Order from '@/model/Order';

export default function ViewOrders({ orders }: { orders: Order[] }) {
  return <Orders orders={orders} />;
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const client = await connectToDB();
  const result = await getCollection(client, 'orders')
    .find({ userEmail: session.user?.email })
    .toArray();
  client.close();

  let orders: Order[] = [];
  result.forEach((order) =>
    orders.push({
      id: order._id.toString(),
      userEmail: order.userEmail,
      items: order.items,
      shippingAddress: order.shippingAddress,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
      paymentResult: order.paymentResult,
      isDelivered: order.isDelivered,
      orderDateTime: order.orderDateTime,
      deliveredAt: order.deliveredAt,
    })
  );

  return {
    props: {
      orders: orders,
    },
  };
}
