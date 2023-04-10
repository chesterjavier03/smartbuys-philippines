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

// handler.use(isAuth, isAdmin, multer().single('file')).put(async (req, res) => {
handler.use(isAuth, isAdmin).put(async (req, res) => {
  await db.connect();
  try {
    const product = await Product.findById(req.body._id);
    product.name = req.body.name;
    product.category = req.body.category;
    product.type = req.body.type;
    product.price = Number(req.body.price);
    product.description = req.body.description;
    await product.save();
    await db.disconnect();
    res.status(200).json({ message: `Product ${product.name} updated!` });
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
