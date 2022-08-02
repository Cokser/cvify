import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_ROOT_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_ROOT_PASSWORD || '';
const MONGO_NAME = process.env.DB_NAME || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_NAME}.83o4l7b.mongodb.net`;

const SERVER_PORT = process.env.SYS_PORT_SERVER
  ? Number(process.env.SYS_PORT_SERVER) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
}
