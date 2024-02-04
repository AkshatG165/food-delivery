import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const order = req.body;

    if (!order) return res.status(422).json({ message: 'Invalid data' });

    try {
      const client = await connectToDB();
      const ordersCollection = getCollection(client, 'orders');

      //creating new order
      const result = await ordersCollection.insertOne(order);
      if (!result.insertedId)
        return res
          .status(500)
          .json({ message: 'Unable to add order to database' });
      client.close();

      return res.status(201).json({
        message: 'Order created successfully!',
        result: result,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to create order' });
    }
  } else if (req.method === 'GET') {
    const { email } = req.query;

    try {
      const client = await connectToDB();
      const result = await getCollection(client, 'order')
        .find({ userEmail: email })
        .toArray();
      client.close();

      return res.status(201).json({
        message: 'Orders fetched successfully!',
        result: result,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to fetch orders' });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
