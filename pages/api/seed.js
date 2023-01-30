import { userSeed } from 'database/data';
import User from 'models/user';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.get(async (req, res) => {
  await User.insertMany(userSeed.users);
  res.send({ message: 'seeded successfully' });
});

export default handler;
