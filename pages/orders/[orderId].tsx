import OrderDetails from '@/components/orders/OrderDetails';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { connectToDB, getCollection } from '@/util/db';
import Order from '@/model/Order';
import { ObjectId } from 'mongodb';

interface OrderWithID extends Order {
  id: string;
}

type Props = {
  order: OrderWithID;
};

export default function ViewOrderDetails({ order }: Props) {
  return <OrderDetails order={order} />;
}

export async function getServerSideProps({
  req,
  res,
  params,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);
  const orderId = new ObjectId(params?.orderId! as string);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const client = await connectToDB();
  const result = await getCollection(client, 'orders').findOne({
    _id: orderId,
  });
  client.close();

  const order = { id: result?._id.toString(), ...result };
  delete order._id;

  return {
    props: {
      order: order,
    },
  };
}
