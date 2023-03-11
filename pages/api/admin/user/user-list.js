import nextConnect from 'next-connect';
import User from 'models/user';
import { isAdmin, isAuth } from 'utils/auth';
import db from 'database/db';

const handler = nextConnect();

handler.use(isAuth, isAdmin).get(async (req, res) => {
  try {
    await db.connect();
    const userList = await User.find({}).lean();
    await db.disconnect();
    res.status(200).json(userList);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: 'Try again later', error: error });
  }
});

export default handler;
