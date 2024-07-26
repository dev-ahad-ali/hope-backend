import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rocppxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${DB_NAME}`
    );
    console.log('MongoDb connected !! Instance:', connectionInstance.connection.host);
  } catch (error) {
    console.log(`DB connection error`, error);
    process.exit(1);
  }
};

export default connectDb;
