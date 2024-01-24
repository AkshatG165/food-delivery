import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const key_id = 'rzp_test_kh11tJtgOa1wTn';
const key_secret = '5TybpcKnHiVmZgi8r82yhJ27';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const razorpay = new Razorpay({ key_id: key_id, key_secret: key_secret });
    const id = req.query.id instanceof Object ? req.query.id[0] : req.query.id;

    try {
      const payment = await razorpay.payments.fetch(id ? id : '');
      return res.status(201).json(payment);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
