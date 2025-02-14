import dotenv from 'dotenv';
dotenv.config();

const CONSTANTS = {
  OPENAI_KEY: process.env.OPEN_AI_KEY,
  PORT: process.env.PORT || 3003,
  DB_USER: process.env.DB_USER || 'root',
  
};

export default CONSTANTS
