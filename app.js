import express, { json } from 'express';
import cors from 'cors';

import userRouter from './Api/Routers/userRouter';

//MIDDLEWARE
const app = express();
app.use(json({ limit: '100kb' }));

app.use(cors());
app.options('*', cors());

//ROUTERS
app.use('/api/v1/user', userRouter);

module.exports = app;