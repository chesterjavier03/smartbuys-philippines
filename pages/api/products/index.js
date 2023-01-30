import connectToDb from 'database/db';
import Product from 'models/product';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    await connectToDb();
    const productList = await Product.find({}).lean();
    res.status(200).json(productList);
  } catch (error) {
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
