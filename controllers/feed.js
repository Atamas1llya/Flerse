import Story from '../models/story';
import Subscribe from '../models/subscribe';

export const getFeed = async function(req, res, next) {
  let feed;

  try {
    feed = await Story.find({ published: true }).sort({date: 'desc'}).populate('holder').lean();
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
      feed
    })
}

export const getSubscribedFeed = async function(req, res, next) {
  let subscribes, feed = [];
  const holder = req.user._id;

  try {
    subscribes = await Subscribe.find({ holder }).lean().exec().map(subscribe => ({
      holder: subscribe.user
    }));
    if (subscribes.length > 0) {
      feed = await Story.find({ "$or": subscribes }).sort({date: 'desc'}).populate('holder').lean();
    }
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
      feed
    })
}
