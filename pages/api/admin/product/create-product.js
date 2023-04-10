import nextConnect from 'next-connect';
import { isAdmin, isAuth } from 'utils/auth';
import db from 'database/db';
import Product from 'models/product';

const handler = nextConnect();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

handler.use(isAuth, isAdmin).post(async (req, res) => {
  await db.connect();
  try {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
      image: req.body.image,
      price: Number(req.body.price),
      description: req.body.description,
    });
    await newProduct.save();
    await db.disconnect();
    res.status(200).json({ message: `Product ${newProduct.name} created!` });
  } catch (error) {
    await db.disconnect();
    res
      .status(400)
      .json({ message: `Try again later ${error.message}`, error: error });
  }
});

export default handler;
