import express from 'express';
import cors from 'cors';

import recommendationRouter from './routers/recommendationRouter.js';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/recommendations', recommendationRouter);

app.use(serverMiddlewareError);

export default app;
