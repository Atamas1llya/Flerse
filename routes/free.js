import { Router } from 'express';
const router = Router();

import * as feed from '../controllers/feed';
import * as users from '../controllers/users';

router.get('/feed', feed.getFeed);

router.get('/users/:nickname', users.findUser);


export default router;
