import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // use 'extended' for sending nested object through url
app.use(express.static('public'));
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js'; // you can use any name while importing when using export default.

// routes declaration
app.use('/api/v1/user', userRouter);

// https://localhost:5000/api/v1/user/register

export { app };
