import jwt from 'jsonwebtoken';
import { secret } from '../config';

export default async function(req, res, next) {
  const token = req.headers['authorization'];

  try {
    var tokenObject = await jwt.verify(token, secret);
  } catch (err) {
    return next({
      status: 403,
      message: 'Invalid token'
    });
  }

  req.token = tokenObject;
  next();
};
