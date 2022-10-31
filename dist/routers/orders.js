"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../middleware/token");
const order_product_1 = require("../models/order-product");
const orders_1 = require("../models/orders");
const utils_1 = require("../utils");
const store = new orders_1.OrderStore();
const opStore = new order_product_1.OrderProductStore();
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('order'));
    }
};
const show = async (req, res) => {
    const userId = +req.params.userId;
    const orderId = +(req.query.orderId?.toString() || '');
    if (!userId)
        return res.status(400).json(utils_1.errorMissingField);
    try {
        const order = await store.show(userId, orderId);
        res.status(200).json(order);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('order'));
    }
};
const create = async (req, res) => {
    const userId = req.query.userId || req.body.quantity || '';
    const productQty = JSON.parse(req.body.product);
    if (!userId || !productQty || productQty.length === 0)
        return res.status(400).json(utils_1.errorMissingField);
    try {
        const order = {
            id: 0,
            user_id: userId,
            status: 'new'
        };
        const createdOrder = await store.create(order);
        const createdOrderProduct = await opStore.create(createdOrder.id, productQty);
        res.status(200).json(createdOrderProduct);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnCreate)('order'));
    }
};
const updateStatus = async (req, res) => {
    const orderId = req.body.orderId;
    const status = req.body.status;
    if (!orderId || !status)
        return res.status(400).json(utils_1.errorMissingField);
    try {
        const rowCount = await store.updateStatus(orderId, status);
        res.status(200).json(rowCount);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('order'));
    }
};
const orderRouters = (app) => {
    app.get('/orders', token_1.adminAuthorization, index); // admin get all orders info
    app.get('/orders/:userId', token_1.userAuthenticated, show); // user can get user's order
    app.post('/orders', token_1.userAuthenticated, create); // user can create order
    app.put('/orders', token_1.userAuthenticated, updateStatus); // user can complete order
};
exports.default = orderRouters;
