import { NextFunction, Request, Response } from 'express';

import { IUser } from '../models/User';
import { IProject } from '../models/Project';
import Logging from '../library/logging';
import { validateAccessToken } from '../services/token'

export const authorized = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return(Logging.error('Unauthorized'));
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return(Logging.error('Unauthorized'));
    }

    const userData = await validateAccessToken(accessToken);
    if (!userData) {
      return(Logging.error('Unauthorized'));
    }

    req.user = userData;
    next();
  } catch (e) {
    return(Logging.error('Unauthorized'));
  }
}
