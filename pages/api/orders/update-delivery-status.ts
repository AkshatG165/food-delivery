import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const order = req.body;

    if (!order) return res.status(422).json({ message: 'Invalid data' });

    try {
      const client = await connectToDB();
      const ordersCollection = getCollection(client, 'orders');

      //creating new order
      const dbRes = await ordersCollection.updateOne(
        { 'paymentResult.id': order.paymentResult.id },
        {
          $set: {
            isDelivered: true,
            deliveredAt: +(Date.now() / 1000).toString().split('.')[0],
          },
        }
      );
      client.close();

      if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
        return res
          .status(500)
          .json({ message: 'Unable to update order status' });

      return res.status(201).json({
        message: 'Order status updated successfully!',
        result: dbRes,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Some error occoured, unable to update order status',
      });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
