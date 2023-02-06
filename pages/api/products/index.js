import db from 'database/db';
import Product from 'models/product';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    await db.connect();
    const productList = await Product.find({}).lean();
    await db.disconnect();
    res.status(200).json(productList);
  } catch (error) {
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
