import express from 'express';
import cors from 'cors';

import * as songController from './controllers/songController';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/recommendations', songController.newSong);

app.use(serverMiddlewareError);
