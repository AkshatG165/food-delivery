import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import getSession from '../get-session';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //for updating an user info
  if (req.method === 'PATCH') {
    const data = req.body;
    const session = await getSession(req, res);

    if (!data.name)
      return res.status(422).json({
        message: 'Invalid Data',
      });

    try {
      const client = await connectToDB();
      const userCollection = getCollection(client, 'users');
      const dbRes = await userCollection.updateOne(
        { email: session && session.user?.email },
        { $set: data }
      );
      client.close();

      if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
        return res.status(500).json({ message: 'Unable to update address' });

      return res
        .status(201)
        .json({ message: 'User info updated successfully!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occurred, unable to update info' });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
