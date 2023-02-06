import db from 'database/db';
import Order from 'models/order';
import nextConnect from 'next-connect';
import { isAuth } from 'utils/auth';
import { onError } from 'utils/error';

const handler = nextConnect({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id }).lean();
  await db.disconnect();
  res.send(orders);
});
export default handler;
