import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { Address } from '@/model/Address';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //for updating an address
  if (req.method === 'PATCH') {
    const {
      id,
      name,
      title,
      mobile,
      pincode,
      address,
      city,
      state,
      location,
      isDefault,
    } = req.body;

    if (!title || !name || !mobile || !pincode || !address || !city || !state) {
      res.status(422).json({
        message: 'Data Missing',
      });
      return;
    }

    //creating an Address object for inserting in db
    const updatedAddres = new Address(
      title,
      name,
      mobile,
      pincode,
      address,
      city,
      state,
      id,
      isDefault,
      location
    );

    try {
      const client = await connectToDB();
      const userCollection = getCollection(client, 'users');
      const dbRes = await userCollection.updateOne(
        { 'addresses.id': id },
        { $set: { 'addresses.$': updatedAddres } }
      );

      //if default set to true, for all other addresses set default to false
      if (isDefault) {
        const dbRes = await userCollection.updateMany(
          { 'addresses.id': id },
          { $set: { 'addresses.$[x].isDefault': false } },
          { arrayFilters: [{ 'x.id': { $nin: [id] } }] }
        );

        if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
          return res.status(500).json({ message: 'Unable to update address' });
      }
      client.close();

      if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
        return res.status(500).json({ message: 'Unable to update address' });

      return res.status(201).json({ message: 'Address updated successfully!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occurred, unable to update address' });
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
