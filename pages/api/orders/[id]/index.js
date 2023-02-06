import db from 'database/db';
import Order from 'models/order';
import nextConnect from 'next-connect';
import { isAuth } from 'utils/auth';

const handler = nextConnect();

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id).lean();
  await db.disconnect();
  res.send(order);
});

export default handler;
