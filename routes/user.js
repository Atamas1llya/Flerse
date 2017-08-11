import { Router } from 'express';
const router = Router();

import * as subscribes from '../controllers/user/subscribes.js';
import * as stories from '../controllers/user/stories';
import * as profile from '../controllers/user/profile';
import * as users from '../controllers/users';
import * as feed from '../controllers/feed';


router.route('/profile')
  .get(profile.getProfile)
  .put(profile.updateProfile);

router.route('/profile/avatar')
  .post(profile.changeAvatar);

router.route('/story')
  .post(stories.newStory);

router.get('/subscribes', feed.getSubscribedFeed);

router.route('/subscribes/:_id')
  .post(subscribes.subscribe)
  .delete(subscribes.unsubscribe);

router.get('/subscribes', subscribes.getSubscribes);

export default router;
