// require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import connectDb from './db/db.js';
import { app } from './app.js';

dotenv.config({
  path: './env',
});

connectDb()
  .then(() => {
    app.on('error', (error) => {
      console.log('Server initialize error', error);
      throw error;
    });
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on Port : ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log('Db connection error:', error);
  });

/*
import express from 'express';
const app = express();
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rocppxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${DB_NAME}`
    );
    app.on('error', (error) => {
      console.log('DB Server Connection error', error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log('DB Connection error:', error);
    throw error;
  }
})();
*/
