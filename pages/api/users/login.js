import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import User from 'models/user';
import { signToken } from 'utils/auth';

const handler = nextConnect();

handler.post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).lean();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
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
});

export default handler;
