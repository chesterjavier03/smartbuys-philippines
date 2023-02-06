import db from 'database/db';
import Product from 'models/product';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
