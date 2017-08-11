import User from '../models/user';
import jwt from 'jsonwebtoken';
import { secret } from '../config';

export const signup = async function(req, res, next) {
  const credentials = req.body;
  let user, token;

  try {
    user = await User.create(credentials);
    token = await jwt.sign({ _id: user._id }, secret);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    })
  }

  res
    .status(200)
    .json({
      success: true,
      message: '',
      token
    })
}

export const checkNickname = async function(req, res, next) {
  const { nickname } = req.body;
  let uniqueness;

  try {
    uniqueness = !await User.findOne({ nickname }).lean();
  } catch ({ message }) {
    return next({
      status: 400,
      message
    })
  }

  res
    .status(200)
    .json({
      success: true,
      uniqueness
    })
}

export const checkEmail = async function(req, res, next) {
  const { email } = req.body;
  let uniqueness;

  try {
    uniqueness = !await User.findOne({ email }).lean();
  } catch ({ message }) {
    return next({
      status: 400,
      message
    })
  }

  res
    .status(200)
    .json({
      success: true,
      uniqueness
    })
}

export const signin = async function(req, res, next) {
  const { email, password } = req.body;
  let user, result, token;

  try {
    user = await User.findOne({ email });
    console.log(user._id);
    result = await user.comparePassword(password);
    token = await jwt.sign({ _id: user._id }, secret);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    });
  };

  res
    .status(200)
    .json({
      success: true,
      token: token
    });
};
