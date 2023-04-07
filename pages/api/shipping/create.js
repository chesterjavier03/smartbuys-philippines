import db from 'database/db';
import Shipping from 'models/shipping';
import nextConnect from 'next-connect';
import { isAuth } from 'utils/auth';
import { onError } from 'utils/error';

const handler = nextConnect({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  try {
    await db.connect();
    const shippingExist = await Shipping.findOne({ user: req.user }).lean();
    if (!shippingExist) {
      const newShipping = new Shipping({
        ...req.body,
        user: req.user._id,
      });
      const shipping = await newShipping.save();
      await db.disconnect();
      res.status(200).send(shipping);
    } else {
      await db.disconnect();
      res.status(200).send(shippingExist);
    }
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});
export default handler;
