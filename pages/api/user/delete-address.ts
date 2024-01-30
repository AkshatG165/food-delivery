import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //for deleting an address
  if (req.method === 'PATCH') {
    const { id } = req.body;

    if (!id)
      return res.status(422).json({
        message: 'Data Missing',
      });

    try {
      const client = await connectToDB();
      const userCollection = getCollection(client, 'users');
      const dbRes = await userCollection.updateOne(
        { 'addresses.id': id },
        { $pull: { addresses: { id: id } } }
      );
      client.close();

      if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
        return res.status(500).json({ message: 'Unable to delete address' });

      return res.status(201).json({ message: 'Address deleted successfully!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occurred, unable to delete address' });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
