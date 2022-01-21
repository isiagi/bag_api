import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const authenticate = (req, res, next) => {
  const reqHeader = req.headers.authorization;
  if (!reqHeader || !reqHeader.startsWith('Bearer')) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'You are not authorize' });
  }
  const token = reqHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'hellolove');
    req.user = { username: payload.userId };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'You are not authorized' });
  }
};

export default authenticate;
