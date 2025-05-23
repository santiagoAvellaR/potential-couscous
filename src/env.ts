import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  HIBP_KEY: process.env.HIBP_KEY,
};