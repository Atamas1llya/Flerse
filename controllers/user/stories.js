import Story from '../../models/story';
import { loadImage } from '../storage.js';

export const newStory = async function(req, res, next) {
  const { title, body, published, date, image, ext } = req.body;
  const { _id } = req.user;
  let story, preview;

  try {
    if (image && ext) {
      preview = await loadImage(image, ext);
    }

    story = await Story.create({ title, body, published, preview, date, holder: _id });
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
      message: 'message',
      story
    })
}
