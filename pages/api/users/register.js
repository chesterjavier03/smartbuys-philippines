import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import User from 'models/user';
import { signToken } from 'utils/auth';
import db from 'database/db';

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    await db.connect();
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      isAdmin: false,
    });
    const user = await newUser.save();
    const token = signToken(user);
    await db.disconnect();
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
