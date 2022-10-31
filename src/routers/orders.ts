import express, { Request, Response } from 'express';
import { adminAuthorization, userAuthenticated } from '../middleware/token';
import { OrderStore, Order } from '../models/orders';
import { errorMissingField, generateErrorOnCreate, generateErrorOnFetch } from '../utils';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('order'));
  }
};

const show = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const orderId = +(req.query.orderId?.toString() || '');
  if (!userId) return res.status(400).json(errorMissingField);
  try {
    const order = await store.show(userId, orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('order'));
  }
};

const create = async (req: Request, res: Response) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const userId = req.query.userId || req.body.quantity || '';
  if (!productId || !quantity || !userId) return res.status(400).json(errorMissingField);
  try {
    const order: Order = {
      id: 0,
      product_id: productId,
      quantity,
      user_id: userId,
      status: 'new'
    };
    const createdOrder = await store.create(order);
    res.status(200).json(createdOrder);
  } catch (error) {
    res.status(400).json(generateErrorOnCreate('order'));
  }
};

const updateStatus = async (req: Request, res: Response) => {
  const orderId = req.body.orderId;
  const status = req.body.status;
  if (!orderId || !status) return res.status(400).json(errorMissingField);
  try {
    const rowCount = await store.updateStatus(orderId, status);
    res.status(200).json(rowCount);
  } catch (error) {
    res.status(400).json(generateErrorOnFetch('order'));
  }
};

const orderRouters = (app: express.Application) => {
  app.get('/orders', adminAuthorization, index);        // admin get all orders info
  app.get('/orders/:userId', userAuthenticated, show);  // user can get user's order
  app.post('/orders', userAuthenticated, create);       // user can create order
  app.put('/orders', userAuthenticated, updateStatus);  // user can complete order
};

export default orderRouters;