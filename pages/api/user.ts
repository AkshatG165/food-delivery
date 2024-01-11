import { User } from '@/model/User';
import { hashPassword } from '@/util/auth';
import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const data = new User(name, email.toLowerCase(), hashedPassword);

    if (!name) {
      res.status(422).json({ message: 'Name is required' });
      return;
    }
    if (
      !email ||
      !email.match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
    ) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }
    if (
      !password ||
      !password.match(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    ) {
      res.status(422).json({
        message:
          'Minimum 8 characters password with combination of uppercase, lowercase, number & special character is required.',
      });
      return;
    }

    try {
      const client = await connectToDB();
      try {
        //checking for duplicate email
        const userCollection = getCollection(client, 'users');
        const userData = await userCollection.findOne({
          email: email,
        });
        if (userData) {
          res.status(422).json({ message: 'Email already exists' });
          client.close();
          return;
        }

        //else creating new user
        const result = await userCollection.insertOne(data);
        res.status(201).json({
          message: 'User account created successfully!',
          result: result,
        });
        client.close();
        return;
      } catch (err) {
        res
          .status(500)
          .json({ message: 'Some error occoured, unable to create user' });
        client.close();
        return;
      }
    } catch (err) {
      res.status(500).json({ message: 'Connection to database failed' });
      return;
    }
  } else if (req.method === 'GET') {
    const params = req.body;
    try {
      const client = await connectToDB();
      try {
        const result = await getCollection(client, 'users')
          .find(params)
          .toArray();
        client.close();
        res.status(201).json({
          message: 'Users fetched successfully!',
          result: result,
        });
        return;
      } catch (err) {
        res
          .status(500)
          .json({ message: 'Some error occoured, unable to fetch users' });
        client.close();
        return;
      }
    } catch (err) {
      res.status(500).json({ message: 'Connection to database failed' });
      return;
    }
  } else {
    res.status(405).json({ message: `${req.method} method not supported` });
    return;
  }
}
