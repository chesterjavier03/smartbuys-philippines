import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import User from 'models/user';
import { isAdmin, isAuth } from 'utils/auth';
import db from 'database/db';

const handler = nextConnect();

handler.use(isAuth, isAdmin).post(async (req, res) => {
  try {
    await db.connect();
    const userExist = await User.findOne({ email: req.body.email }).lean();
    if (userExist) {
      await db.disconnect();
      res.status(409).json({ message: 'Email already registered.' });
      return;
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      isAdmin: req.body.isAdmin ? false : true,
    });
    const user = await newUser.save();
    await db.disconnect();
    res.status(200).json({ message: `User ${user.name} created!` });
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
