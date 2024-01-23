import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const key_secret = '5TybpcKnHiVmZgi8r82yhJ27';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sha = crypto.createHmac('sha256', key_secret);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest('hex');

    if (digest !== razorpay_signature) {
      return res.status(400).json({ message: 'Transaction is invalid' });
    } else return res.status(201).json({ message: 'Transaction successful!' });
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not supported` });
  }
}
