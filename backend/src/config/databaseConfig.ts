import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

async function initDB() {
  try {
    const DBUSER = process.env.DB_USER;
    const DBPASSWORD = process.env.DB_PASSWORD;

    await mongoose.connect(
       `mongodb+srv://${DBUSER}:${DBPASSWORD}@saldocluster.dynl00m.mongodb.net/?appName=SaldoCluster`
    );
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

export { initDB };