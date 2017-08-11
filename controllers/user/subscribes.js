import Subscribe from '../../models/subscribe';

export const subscribe = async function(req, res, next) {
  const { _id } = req.params;
  const holder = req.user._id;
  let subscribe;

  try {
    subscribe = await Subscribe.create({ holder, user: _id });
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
      subscribe
    })
}

export const unsubscribe = async function(req, res, next) {
  const { _id } = req.params;
  const holder = req.user._id;
  let subscribe;

  try {
    subscribe = await Subscribe.findOneAndRemove({ holder, user: _id }).lean();
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
      subscribe
    })
}

export const getSubscribes = async function(req, res, next) {
  const holder = req.user._id;
  let subscribes;

  try {
    subscribes = await Subscribe.find({ holder }).populate('user').lean();
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
      subscribes
    })
}
