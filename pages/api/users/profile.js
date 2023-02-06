import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import { isAuth, signToken } from 'utils/auth';
import db from 'database/db';
import User from 'models/user';

const handler = nextConnect();
handler.use(isAuth);

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  const token = signToken(user);
  await db.disconnect();
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
