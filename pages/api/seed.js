import { userSeed } from 'database/data';
import db from 'database/db';
import User from 'models/user';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get(async (req, res) => {
  await db.connect();
  await User.insertMany(userSeed.users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
