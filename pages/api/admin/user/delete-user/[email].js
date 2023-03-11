import nextConnect from 'next-connect';
import User from 'models/user';
import { isAdmin, isAuth } from 'utils/auth';
import db from 'database/db';

const handler = nextConnect();

handler.use(isAuth, isAdmin).delete(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.query.email });
  if (user) {
    await user.remove();
    await db.disconnect();
    res.send({ message: 'User deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User not found' });
  }
});

export default handler;
