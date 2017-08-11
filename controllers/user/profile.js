import User from '../../models/user';
import { loadImage } from '../storage';

export const getProfile = async function(req, res, next) {
  const { _id } = req.user;
  let user;

  try {
    user = await User.findOne({ _id }, { password: 0 }).lean();
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
      user
    })
}

export const updateProfile = async function(req, res, next) {
  const { _id } = req.user;
  const profile = req.body;
  let user;

  try {
    user = await User.findOne({ _id }).update(profile).lean();
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
      user
    })
}

export const changeAvatar = async function(req, res, next) {
  const { _id } = req.user;
  const { image, ext } = req.body;
  let user, avatar;

  try {
    avatar = await loadImage(image, ext);
    user = await User.findOneAndUpdate({_id}, { avatar });
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
      user
    })
}
