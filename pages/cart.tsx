import Cart from '@/components/cart/Cart';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { connectToDB, getCollection } from '@/util/db';
import { CartItem } from '@/model/CartItem';

export default function ViewCart({ cartItems }: { cartItems: CartItem[] }) {
  return <Cart cartItems={cartItems} />;
}

type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export async function getServerSideProps({ req, res }: Context) {
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
  const result = await getCollection(client, 'users').findOne({
    email: session.user?.email,
  });
  const cartItems = result?.cartItems;
  client.close();

  return {
    props: { cartItems: cartItems },
  };
}
