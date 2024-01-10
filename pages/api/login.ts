import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secretKey = 'SecretKey';

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
          email: email.toLowerCase(),
        });
        client.close();

        //checking if email & password matches
        if (!result) {
          res.status(401).json({
            message: 'Authentication failed, user does not exist',
          });
        } else if (password === result.password) {
          //generating jwt token
          const token = jwt.sign(result, secretKey, {
            expiresIn: 3600,
          });
          res.status(201).json({
            message: 'Authentication successfull!',
            token: token,
          });
        } else {
          res.status(401).json({
            message: 'Authentication failed, invalid password',
          });
        }
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