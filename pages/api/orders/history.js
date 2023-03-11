import nextConnect from 'next-connect';
import { isAuth } from 'utils/auth';
import db from 'database/db';
import Order from 'models/order';
import User from 'models/user';

const handler = nextConnect();

handler.use(isAuth).get(async (req, res) => {
  try {
    await db.connect();
    const orderList = await Order.find({ user: req.user._id })
      .populate({ path: 'orderItems', populate: 'product' })
      .populate({ path: 'user', model: User })
      .lean();
    await db.disconnect();
    res.status(200).json(orderList);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
