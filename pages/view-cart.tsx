import Cart from '@/components/cart/Cart';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export default function ViewCart() {
  return <Cart />;
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

  return {
    props: {
      session,
    },
  };
}
