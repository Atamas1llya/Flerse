import User from '../models/user';
import Story from '../models/story';
import Subscribe from '../models/subscribe';

export const findUser = async function(req, res, next) {
  const { nickname } = req.params;
  let user;

  try {
    // REVIEW:
    user = await User.findOne({ nickname }, { password: 0, email: 0 }).lean();
    if (req.user) {
      user.subscribed = !!await Subscribe.findOne({ user: user._id, holder: req.user._id }).lean();
    }
    user.stories = await Story.find({ holder: user._id, published: true }).sort({date: 'desc'}).lean();

    if (!user) throw new Error('User not found');
  } catch ({ message }) {
    return next({
      status: 404,
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
