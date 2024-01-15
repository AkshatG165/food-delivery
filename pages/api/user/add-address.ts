import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import getSession from '../get-session';
import { Address } from '@/model/Address';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //for adding a new addresses of an user
  if (req.method === 'PATCH') {
    const { title, name, mobile, pincode, address, city, state } = req.body;
    const session = await getSession(req, res);

    if (!title || !name || !mobile || !pincode || !address || !city || !state) {
      res.status(422).json({
        message: 'Data Missing',
      });
      return;
    }

    //creating an Address object for inserting in db
    const addressObj = new Address(
      title,
      name,
      mobile,
      pincode,
      address,
      city,
      state
    );

    try {
      const client = await connectToDB();
      const userCollection = getCollection(client, 'users');
      const dbRes = await userCollection.updateOne(
        { email: session && session.user?.email },
        { $push: { addresses: addressObj } } //pushes address in addresses array
      );
      client.close();

      if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
        return res.status(500).json({ message: 'Unable to add address' });

      return res.status(201).json({ message: 'Address added successfully!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to add address' });
    }
  } else {
    res.status(405).json({ message: `${req.method} method not supported` });
    return;
  }
}
