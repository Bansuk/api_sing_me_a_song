import { Router } from 'express';

import * as songController from '../controllers/songController.js';

const router = new Router();

router.post('', songController.newSong);
router.post('/:id/upvote', songController.newVote);
router.post('/:id/downvote', songController.newVote);
router.get('/random', songController.getRandomSong);
router.get('/top/:amount', songController.getTopSongs);

export default router;
