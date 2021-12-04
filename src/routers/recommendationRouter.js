import { Router } from 'express';

import * as songController from '../controllers/songController.js';

const router = new Router();

router.post('/recommendations', songController.newSong);
router.post('/recommendations/:id/upvote', songController.newVote);
router.post('/recommendations/:id/downvote', songController.newVote);

export default router;
