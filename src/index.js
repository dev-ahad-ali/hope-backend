// require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import connectDb from './db/db.js';

dotenv.config({
  path: './env',
});

connectDb();

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
