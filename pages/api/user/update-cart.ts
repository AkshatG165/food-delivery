import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import getSession from '../get-session';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //for updating cart items of an user
  if (req.method === 'PATCH') {
    const cartItems = req.body;
    const session = await getSession(req, res);

    try {
      const client = await connectToDB();
      const userCollection = getCollection(client, 'users');
      const dbRes = await userCollection.updateOne(
        { email: session && session.user?.email },
        { $set: cartItems }
      );
      client.close();

      if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
        return res.status(500).json({ message: 'Unable to update cart items' });

      return res
        .status(201)
        .json({ message: 'Cart items updated successfully!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to update' });
    }
  } else {
    res.status(405).json({ message: `${req.method} method not supported` });
    return;
  }
}
