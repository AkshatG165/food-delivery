import Profile from '@/components/profile/Profile';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { connectToDB, getCollection } from '@/util/db';
import { authOptions } from './api/auth/[...nextauth]';
import { User } from '@/model/User';

export default function ViewProfile({ user }: { user: User }) {
  return <Profile user={user} />;
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
  const result = await getCollection(client, 'users').findOne({
    email: session.user?.email,
  });
  client.close();

  const user = { id: result?._id.toString(), ...result };
  delete user._id;

  return {
    props: {
      user: user,
    },
  };
}
