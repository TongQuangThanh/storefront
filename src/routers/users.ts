import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { User, UserStore } from '../models/users';
import { adminAuthorization, userAuthenticated } from '../middleware/token';
import { generateErrorOnCreate, generateErrorOnFetch } from '../utils';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('user'));
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    if (id) {
      const user = await store.show(id);
      res.status(200).json(user);
    } else {
      res.status(400).json(generateErrorOnFetch('user'));
    }
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('user'));
  }
};

const create = async (req: Request, res: Response) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.password) {
    res.status(400).json(generateErrorOnCreate('user', req.body.firstName));
    return;
  }
  const user: User = {
    id: 0,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    role: req.body.role || 'user',
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(generateErrorOnCreate('user', user.firstName));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const u = await store.authenticate(req.body.id, req.body.password);
    if (u) {
      const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
      res.status(200).json(token);
    } else {
      res.status(401).json('User not found!!!');
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

const userRouters = (app: express.Application) => {
  app.post('/users/login', login);                // login
  app.get('/users', adminAuthorization, index);   // admin see all user
  app.get('/users/:id', userAuthenticated, show); // user see user info
  app.post('/users', create);                     // create user
};

export default userRouters;