"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
const db_1 = __importDefault(require("../db"));
const utils_1 = require("../utils");
class OrderProductStore {
    async create(orderId, productQty) {
        try {
            let values = '';
            for (let i = 0; i < productQty.length; i++) {
                const e = productQty[i];
                if (i !== 0) {
                    values += ', ';
                }
                values += `(${orderId}, ${e.productId}, ${e.quantity})`;
            }
            const sqlOrderProduct = `INSERT INTO order_product (order_id, product_id, quantity) VALUES ${values} RETURNING *`;
            const conn = await db_1.default.connect();
            const resultOrderProduct = await conn.query(sqlOrderProduct);
            conn.release();
            return resultOrderProduct.rows;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnCreate)('order'));
        }
    }
}
exports.OrderProductStore = OrderProductStore;
