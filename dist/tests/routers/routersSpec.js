"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const const_1 = require("../models/const");
const request = (0, supertest_1.default)(server_1.app);
let userToken = '';
let adminToken = '';
const invalidToken = 'ThisIsSomeStuff';
describe('Test user API', () => {
    it('POST /users/login (admin) able to login', async () => {
        const response = await request.post('/users/login').send({ id: const_1.adminId, password: const_1.adminPassword });
        adminToken = response.body;
        expect(response.status).toBe(200);
    });
    it('GET /users admin can get all user info', async () => {
        const response = await request.get('/users/').set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
    });
    it('POST /users admin can create user', async () => {
        const response = await request.post('/users').set('Authorization', `Bearer ${adminToken}`).send(const_1.user);
        expect(response.status).toBe(200);
    });
    it('POST /users/login (user) able to login', async () => {
        const response = await request.post('/users/login').send({ id: const_1.userId, password: const_1.userPassword });
        userToken = response.body;
        expect(response.status).toBe(200);
    });
    it('GET /users/:id user can get user info', async () => {
        const response = await request.get('/users/1').set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    it('GET /users user can not get all user info', async () => {
        const response = await request.get('/users/').set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(403);
    });
    it('GET /users invalid user can not get all user info', async () => {
        const response = await request.get('/users/').set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(403);
    });
    it('GET /users unknown user can not get all user info', async () => {
        const response = await request.get('/users/');
        expect(response.status).toBe(401);
    });
});
describe('Test product API', () => {
    it('GET /products user can get all products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('GET /products/category user can get products by category', async () => {
        const response = await request.get('/products/category').send({ category: const_1.category1 });
        expect(response.status).toBe(200);
    });
    it('GET /products/popular user can get products by best buy', async () => {
        const response = await request.get('/products/popular');
        expect(response.status).toBe(200);
    });
    it('GET /products/:id user can get products by id', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    });
    it('POST /products admin can create products', async () => {
        const response = await request.post('/products').set('Authorization', `Bearer ${adminToken}`).send(const_1.product1);
        expect(response.status).toBe(200);
    });
    it('POST /products user can not create products', async () => {
        const response = await request.post('/products').set('Authorization', `Bearer ${userToken}`).send(const_1.product1);
        expect(response.status).toBe(403);
    });
    it('POST /products invalid user can not create products', async () => {
        const response = await request.post('/products').set('Authorization', `Bearer ${invalidToken}`).send(const_1.product1);
        expect(response.status).toBe(403);
    });
    it('POST /products unknown user can not create products', async () => {
        const response = await request.post('/products').send(const_1.product1);
        expect(response.status).toBe(401);
    });
});
describe('Test order API', () => {
    it('GET /orders admin can get all orders info', async () => {
        const response = await request.get('/orders').set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(200);
    });
    it('GET /orders user can not get all orders info', async () => {
        const response = await request.get('/orders').set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(403);
    });
    it('GET /orders invalid user can not get all orders info', async () => {
        const response = await request.get('/orders').set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(403);
    });
    it('GET /orders unknown user can not get all orders info', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(401);
    });
    it('GET /orders/:userId invalid user can not get order by user', async () => {
        const response = await request.get('/orders/1').set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(400);
    });
    it('GET /orders/:userId unknown user can not get order by user', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(401);
    });
    it('GET /orders/:userId user can get order by user', async () => {
        const response = await request.get('/orders/1').set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    it('POST /orders invalid user can not create order', async () => {
        const response = await request.post('/orders').set('Authorization', `Bearer ${invalidToken}`).send(const_1.order);
        expect(response.status).toBe(400);
    });
    it('POST /orders unknown user can not create order', async () => {
        const response = await request.post('/orders').send(const_1.order);
        expect(response.status).toBe(401);
    });
    it('POST /orders user can create order', async () => {
        const response = await request.post('/orders').set('Authorization', `Bearer ${userToken}`).send(const_1.order);
        expect(response.status).toBe(403);
    });
    it('PUT /orders invalid user can not complete order', async () => {
        const response = await request.put('/orders').set('Authorization', `Bearer ${invalidToken}`).send({ status: const_1.completedStatus });
        expect(response.status).toBe(400);
    });
    it('PUT /orders unknown user can not complete order', async () => {
        const response = await request.put('/orders').send({ status: const_1.completedStatus });
        expect(response.status).toBe(401);
    });
    it('PUT /orders user can complete order', async () => {
        const response = await request.put('/orders').set('Authorization', `Bearer ${userToken}`).send({ orderId: 1, userId: 1, status: const_1.completedStatus });
        expect(response.status).toBe(200);
    });
});
