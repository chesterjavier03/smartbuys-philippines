import db from 'database/db';
import Order from 'models/order';
import nextConnect from 'next-connect';
import { isAuth } from 'utils/auth';
import { onError } from 'utils/error';

const handler = nextConnect({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
    shipping: req.body.shippingAddress._id,
  });
  const order = await newOrder.save();
  await db.disconnect();
  res.status(200).send(order);
});
export default handler;
