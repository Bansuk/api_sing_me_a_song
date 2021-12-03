import { Router } from 'express';

import * as songController from '../controllers/songController';

const router = new Router();

router.post('/recommendations', songController.newSong);

export default router;
