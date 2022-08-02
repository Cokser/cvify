import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';

import { config } from './config/config';
import Logging from './library/logging';
import userRoutes from './routes/User';
import projectsRoutes from './routes/Project';


const router = express();


/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Mongo connected successfully.')
    StartServer()
  })
  .catch((error) => Logging.error(error))

const StartServer = () => {
  router.use(cors())
  router.use((req, res, next) => {
    Logging.info(`Incoming -> Request [${req.method}] - Url: [${req.url}] - IP: - [${req.socket.remoteAddress}]`)
    res.on('finish', () => {
      /** Log the res */
      Logging.info(`Result - Request: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`)
    })

    next();
  })

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  router.use('/users', userRoutes);
  router.use('/projects', projectsRoutes);

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error('Not found')

    Logging.error(error);

    res.status(404).json({
      message: error.message,
    });
  })
  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`))
}
