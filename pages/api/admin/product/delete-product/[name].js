import nextConnect from 'next-connect';
import { isAdmin, isAuth } from 'utils/auth';
import db from 'database/db';
import Product from 'models/product';

const handler = nextConnect();

handler.use(isAuth, isAdmin).delete(async (req, res) => {
  await db.connect();
  const product = await Product.findOne({ name: req.query.name });
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: 'Product deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
});

export default handler;
