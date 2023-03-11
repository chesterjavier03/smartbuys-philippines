import nextConnect from 'next-connect';
import { isAdmin, isAuth } from 'utils/auth';
import db from 'database/db';
import Product from 'models/product';

const handler = nextConnect();

handler.use(isAuth, isAdmin).get(async (req, res) => {
  try {
    await db.connect();
    const productList = await Product.find({}).lean();
    await db.disconnect();
    res.status(200).json(productList);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
