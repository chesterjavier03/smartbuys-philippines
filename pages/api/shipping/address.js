import db from 'database/db';
import Shipping from 'models/shipping';
import nextConnect from 'next-connect';
import { isAuth } from 'utils/auth';
import { onError } from 'utils/error';

const handler = nextConnect({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  try {
    await db.connect();
    const shippingAddress = await Shipping.findOne({ user: req.user }).lean();
    if (!shippingAddress) {
      res.status(200).send(shippingAddress);
    } else {
      await db.disconnect();
      res.status(200).send(shippingAddress);
    }
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});
export default handler;
