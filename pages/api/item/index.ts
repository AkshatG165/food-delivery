import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const client = await connectToDB();
      const itemsCollection = getCollection(client, 'items');
      const result = await itemsCollection.insertOne(data);
      client.close();

      return res.status(201).json({ message: 'Item inserted', result: result });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to insert item' });
    }
  } else if (req.method === 'GET') {
    const { orderId } = req.query;

    try {
      const client = await connectToDB();
      const result = await getCollection(client, 'items')
        .find({ 'ratings.orderId': orderId })
        .toArray();
      client.close();

      return res
        .status(201)
        .json({ message: 'Items fetched successfully', result: result });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to insert item' });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
