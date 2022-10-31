import express from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { User } from '../models/users';
import { clientError, errorForbidden, errorLoginRequired } from '../utils';

const isAdmin = (user: User) => user?.role?.toLowerCase() === 'admin';

export const userAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization || 'Bearer';
    const authorizations = authorizationHeader.split(' ');
    if (authorizations.length === 2) {
      const token = authorizations[1];
      const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`) as JwtPayload;
      const userId = req.params.userId || req.params.id || req.body.userId;
      if (decoded.user?.id === +userId || isAdmin(decoded.user)) {
        next();
      } else {
        res.status(403).json(errorForbidden);
        return;
      }
    } else {
      res.status(401).json(errorLoginRequired);
      return;
    }
  } catch (err) {
    if (!(err instanceof JsonWebTokenError)) {
      console.error(err);
    }
    res.status(400).json(clientError);
    return;
  }
};

export const adminAuthorization = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization || 'Bearer';
    const authorizations = authorizationHeader.split(' ');
    if (authorizations.length === 2) {
      const token = authorizations[1];
      const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`) as JwtPayload;
      if (isAdmin(decoded.user)) {
        next();
      } else {
        res.status(403).json(errorForbidden);
        return;
      }
    } else {
      res.status(401).json(errorLoginRequired);
      return;
    }
  } catch (err) {
    if (!(err instanceof JsonWebTokenError)) {
      console.error(err);
    }
    res.status(403).json(clientError);
    return;
  }
};