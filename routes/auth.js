import { Router } from 'express';
const router = Router();

import * as auth from '../controllers/auth';

router.post('/signup', auth.signup);
router.post('/signup/nickname', auth.checkNickname);
router.post('/signup/email', auth.checkEmail);

router.post('/signin', auth.signin);

export default router;
