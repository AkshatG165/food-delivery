import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !email.includes('@') || !email.includes('.com'))
      res.status(422).json({ message: 'Invalid email' });

    try {
      const client = await connectToDB();
      try {
        const result = await getCollection(client, 'users').findOne({
          email: email,
        });
        client.close();
        res.status(201).json({
          message: 'Users fetched successfully!',
          result: result,
        });
      } catch (err) {
        res
          .status(500)
          .json({ message: 'Some error occoured, unable to authenticate' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Connection to database failed' });
    }
  } else {
    res.status(405).json({ message: `${req.method} method not supported` });
  }
}
