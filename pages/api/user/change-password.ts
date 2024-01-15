import { connectToDB, getCollection } from '@/util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import getSession from '../get-session';
import { checkPassword, hashPassword } from '@/util/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //for updating addresses of an user
  if (req.method === 'PATCH') {
    const { oldPassword, newPassword } = req.body;
    const session = await getSession(req, res);

    if (!oldPassword) {
      res.status(422).json({
        message: 'Old Password is required',
      });
      return;
    }

    if (
      !newPassword ||
      !newPassword.match(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    ) {
      res.status(422).json({
        message:
          'Minimum 8 characters password with combination of uppercase, lowercase, number & special character is required.',
      });
      return;
    }

    if (oldPassword === newPassword) {
      res.status(422).json({
        message: 'New password & old password should be different',
      });
      return;
    }

    try {
      const client = await connectToDB();
      const userCollection = getCollection(client, 'users');

      //check if old password matches with the password in db
      const userData = await userCollection.findOne({
        email: session && session.user?.email,
      });

      if (!(await checkPassword(oldPassword, userData?.password))) {
        client.close();
        return res.status(403).json({ message: 'Old password is incorrect' });
      }

      //updating the password in db if all validation passed
      const dbRes = await userCollection.updateOne(
        { email: session && session.user?.email },
        { $set: { password: await hashPassword(newPassword) } }
      );
      client.close();

      if (dbRes.modifiedCount !== 1 && dbRes.matchedCount !== 1)
        return res.status(500).json({ message: 'Unable to update password' });

      return res
        .status(201)
        .json({ message: 'Password updated successfully!' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Some error occoured, unable to update password' });
    }
  } else {
    res.status(405).json({ message: `${req.method} method not supported` });
    return;
  }
}
