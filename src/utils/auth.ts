import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

import { User } from '../models/user.model';

const jwt = require('jsonwebtoken');

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers?.authorization;
  if (!bearerHeader) return res.sendStatus(403);

  //If token exists, extract and verify it.

  jwt.verify(bearerHeader, process.env.JWT_SECRET || 'superSecret', (error: unknown) => {
    if (error) return res.sendStatus(403);
    next();
  });
};
