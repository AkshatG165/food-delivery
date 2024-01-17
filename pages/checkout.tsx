import CheckoutForm from '@/components/checkout/CheckoutForm';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { Address } from '@/model/Address';
import { connectToDB, getCollection } from '@/util/db';

type Props = {
  addresses: Address[];
};

export default function Checkout({ addresses }: Props) {
  return <CheckoutForm addresses={addresses} />;
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

  //connecting to database
  const client = await connectToDB();
  const result = await getCollection(client, 'users').findOne({
    email: session.user?.email,
  });
  client.close();

  const addresses = result?.addresses;
  return {
    props: {
      addresses: addresses,
    },
  };
}
