import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      //connecting to database
      const client = await MongoClient.connect(
        'mongodb+srv://akshat:akshat123@fooddelivery.xcarl62.mongodb.net/food-delivery?retryWrites=true&w=majority'
      );
      const db = client.db();
      const items = db.collection('items');
      const result = await items.insertOne(data);
      client.close();

      res.status(201).json({ message: 'item inserted', result: result });
      return;
    } catch (e) {
      res.status(400).json({ message: 'item not inserted' });
      return;
    }
  }
}
