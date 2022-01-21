import userModel from '../models/userModal.js';
import { StatusCodes } from 'http-status-codes';

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'provide email and password' });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'provide valid email and password' });
  }

  const passwordMatch = await user.matchPassword(password);
  if (!passwordMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'provide valid email and password' });
  }

  const token = await user.jwtToken();
  res.status(StatusCodes.OK).json({ username: user.name, token: token });
};

const register = async (req, res) => {
  const user = await userModel.create(req.body);
  const token = await user.jwtToken();
  res.status(StatusCodes.OK).json({ username: user.name, token: token });
};

export { login, register };
