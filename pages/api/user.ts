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

    if (!name) res.status(422).json({ message: 'Name is required' });
    if (!email || !email.includes('@') || !email.includes('.com'))
      res.status(422).json({ message: 'Invalid email' });
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
    }

    try {
      const client = await connectToDB();
      try {
        //checking for duplicate email
        const userData = await getCollection(client, 'users').findOne({
          email: email,
        });
        if (userData) res.status(422).json({ message: 'Email already exists' });

        //creating new user
        const result = await getCollection(client, 'users').insertOne(data);
        res.status(201).json({
          message: 'User account created successfully!',
          result: result,
        });
        client.close();
      } catch (err) {
        res
          .status(500)
          .json({ message: 'Some error occoured, unable to create user' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Connection to database failed' });
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
      } catch (err) {
        res
          .status(500)
          .json({ message: 'Some error occoured, unable to fetch users' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Connection to database failed' });
    }
  } else {
    res.status(405).json({ message: `${req.method} method not supported` });
  }
}

// when there are errors users are still getting added to db
