import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import User from 'models/user';
import { signToken } from 'utils/auth';
import db from 'database/db';

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ email: req.body.email }).lean();
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken(user);
      await db.disconnect();
      res.status(200).send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
