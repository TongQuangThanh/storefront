
import supertest from 'supertest';
import { app } from '../../server';
import { adminId, adminPassword, category1, completedStatus, order, product1, user, userId, userPassword } from '../models/const';

const request = supertest(app);
let userToken = '';
let adminToken = '';
const invalidToken = 'ThisIsSomeStuff';

describe('Test user API', (): void => {
  it('POST /users/login (admin) able to login', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/users/login').send({ id: adminId, password: adminPassword });
    adminToken = response.body;
    expect(response.status).toBe(200);
  });

  it('GET /users admin can get all user info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/users/').set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
  });

  it('POST /users admin can create user', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/users').set('Authorization', `Bearer ${adminToken}`).send(user);
    expect(response.status).toBe(200);
  });

  it('POST /users/login (user) able to login', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/users/login').send({ id: userId, password: userPassword });
    userToken = response.body;
    expect(response.status).toBe(200);
  });

  it('GET /users/:id user can get user info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/users/1').set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(200);
  });

  it('GET /users user can not get all user info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/users/').set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(403);
  });

  it('GET /users invalid user can not get all user info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/users/').set('Authorization', `Bearer ${invalidToken}`);
    expect(response.status).toBe(403);
  });

  it('GET /users unknown user can not get all user info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/users/');
    expect(response.status).toBe(401);
  });
});



describe('Test product API', (): void => {
  it('GET /products user can get all products', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('GET /products/category user can get products by category', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/products/category').send({ category: category1 });
    expect(response.status).toBe(200);
  });

  it('GET /products/popular user can get products by best buy', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/products/popular');
    expect(response.status).toBe(200);
  });

  it('GET /products/:id user can get products by id', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('POST /products admin can create products', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/products').set('Authorization', `Bearer ${adminToken}`).send(product1);
    expect(response.status).toBe(200);
  });

  it('POST /products user can not create products', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/products').set('Authorization', `Bearer ${userToken}`).send(product1);
    expect(response.status).toBe(403);
  });

  it('POST /products invalid user can not create products', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/products').set('Authorization', `Bearer ${invalidToken}`).send(product1);
    expect(response.status).toBe(403);
  });

  it('POST /products unknown user can not create products', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/products').send(product1);
    expect(response.status).toBe(401);
  });
});



describe('Test order API', (): void => {
  it('GET /orders admin can get all orders info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/orders').set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
  });

  it('GET /orders user can not get all orders info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/orders').set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(403);
  });

  it('GET /orders invalid user can not get all orders info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/orders').set('Authorization', `Bearer ${invalidToken}`);
    expect(response.status).toBe(403);
  });

  it('GET /orders unknown user can not get all orders info', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/orders');
    expect(response.status).toBe(401);
  });

  it('GET /orders/:userId invalid user can not get order by user', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/orders/1').set('Authorization', `Bearer ${invalidToken}`);
    expect(response.status).toBe(400);
  });

  it('GET /orders/:userId unknown user can not get order by user', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/orders/1');
    expect(response.status).toBe(401);
  });

  it('GET /orders/:userId user can get order by user', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/orders/1').set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(200);
  });

  it('POST /orders invalid user can not create order', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/orders').set('Authorization', `Bearer ${invalidToken}`).send(order);
    expect(response.status).toBe(400);
  });

  it('POST /orders unknown user can not create order', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/orders').send(order);
    expect(response.status).toBe(401);
  });

  it('POST /orders user can create order', async (): Promise<void> => {
    const response: supertest.Response = await request.post('/orders').set('Authorization', `Bearer ${userToken}`).send(order);
    expect(response.status).toBe(403);
  });

  it('PUT /orders invalid user can not complete order', async (): Promise<void> => {
    const response: supertest.Response = await request.put('/orders').set('Authorization', `Bearer ${invalidToken}`).send({ status: completedStatus });
    expect(response.status).toBe(400);
  });

  it('PUT /orders unknown user can not complete order', async (): Promise<void> => {
    const response: supertest.Response = await request.put('/orders').send({ status: completedStatus });
    expect(response.status).toBe(401);
  });

  it('PUT /orders user can complete order', async (): Promise<void> => {
    const response: supertest.Response = await request.put('/orders').set('Authorization', `Bearer ${userToken}`).send({ orderId: 1, userId: 1, status: completedStatus });
    expect(response.status).toBe(200);
  });
});