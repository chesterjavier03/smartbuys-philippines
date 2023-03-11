import nextConnect from 'next-connect';
import { isAdmin, isAuth } from 'utils/auth';
import db from 'database/db';
import User from 'models/user';

const handler = nextConnect();
handler.use(isAuth, isAdmin);

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  user.isAdmin = req.body.isAdmin;
  await user.save();
  await db.disconnect();
  res.send();
});

export default handler;
