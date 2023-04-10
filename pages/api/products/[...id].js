import nextConnect from 'next-connect';
import db from 'database/db';

import Product from 'models/product';

const handler = nextConnect();

handler.get('/api/products/getAll', async (req, res) => {
  try {
    await db.connect();
    // const productList = await Product.find({}).lean();
    const productList = await Product.aggregate([{ $sample: { size: 2000 } }]);
    await db.disconnect();
    res.status(200).json(productList);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

handler.get('/api/products/filter/byCategory', async (req, res) => {
  try {
    await db.connect();
    const products = await Product.find({
      category: req.query.category,
    }).lean();
    await db.disconnect();
    res.status(200).json(products);
  } catch (error) {
    await db.disconnect();
    return res.status(error.status || 500).end(error.message);
  }
});

handler.get('/api/products/filter/byType', async (req, res) => {
  try {
    await db.connect();
    const products = await Product.find({ type: req.query.type }).lean();
    await db.disconnect();
    res.status(200).json(products);
  } catch (error) {
    await db.disconnect();
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
});

handler.get('/api/products/', async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.status(200).json(product);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
