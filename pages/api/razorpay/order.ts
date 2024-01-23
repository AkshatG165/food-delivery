import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const key_id = 'rzp_test_kh11tJtgOa1wTn';
const key_secret = '5TybpcKnHiVmZgi8r82yhJ27';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const razorpay = new Razorpay({ key_id: key_id, key_secret: key_secret });

    try {
      const order = await razorpay.orders.create(req.body);
      return res.status(201).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
