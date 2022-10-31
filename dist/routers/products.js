"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../middleware/token");
const products_1 = require("../models/products");
const utils_1 = require("../utils");
const store = new products_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('product'));
    }
};
const show = async (req, res) => {
    try {
        const id = +req.params.id;
        const product = await store.show(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('product'));
    }
};
const showProductPopular = async (req, res) => {
    try {
        const product = await store.popular();
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('product'));
    }
};
const showProductByCategory = async (req, res) => {
    const category = req.body.category;
    if (!category) {
        res.status(400).json(utils_1.errorMissingField);
        return;
    }
    try {
        const product = await store.showProductByCategory(category);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('product'));
    }
};
const create = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    if (!name || !price) {
        res.status(400).json(utils_1.errorMissingField);
        return;
    }
    try {
        const product = {
            id: 0,
            name,
            price,
            category
        };
        const createdProduct = await store.create(product);
        res.status(200).json(createdProduct);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnCreate)('product', name));
    }
};
const productRouters = (app) => {
    app.get('/products', index); // user see all products
    app.get('/products/category', showProductByCategory); // user see product by category
    app.get('/products/popular', showProductPopular); // user see top best buy product
    app.get('/products/:id', show); // user see product
    app.post('/products', token_1.adminAuthorization, create); // admin create product
};
exports.default = productRouters;
