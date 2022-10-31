"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const db_1 = __importDefault(require("../db"));
const utils_1 = require("../utils");
class ProductStore {
    async index() {
        try {
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('product'));
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('product'));
        }
    }
    async popular() {
        try {
            // const sql = 'SELECT *, SUM(quantity) as SUM FROM orders GROUP BY product_id, id ORDER BY SUM DESC LIMIT 5';
            const sql = 'SELECT *, SUM(quantity) as SUM FROM products JOIN order_product ON products.id=order_product.product_id GROUP BY order_product.id, products.id ORDER BY SUM DESC LIMIT 5';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('product'));
        }
    }
    async showProductByCategory(category) {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('product'));
        }
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnCreate)('product', p.name));
        }
    }
}
exports.ProductStore = ProductStore;
