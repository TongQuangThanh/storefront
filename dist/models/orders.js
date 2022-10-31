"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const db_1 = __importDefault(require("../db"));
const utils_1 = require("../utils");
class OrderStore {
    async index() {
        try {
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM Orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('order'));
        }
    }
    async show(userId, orderId) {
        try {
            const conn = await db_1.default.connect();
            let sql = '';
            let result;
            if (orderId) {
                sql = 'SELECT * FROM Orders WHERE user_id=($1) AND id=($2)';
                const res = await conn.query(sql, [userId, orderId]);
                result = res.rows[0];
            }
            else {
                sql = 'SELECT * FROM Orders WHERE user_id=($1)';
                const res = await conn.query(sql, [userId]);
                result = res.rows;
            }
            conn.release();
            return result;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('order'));
        }
    }
    async create(o) {
        try {
            const sql = 'INSERT INTO Orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnCreate)('order'));
        }
    }
    async updateStatus(id, status) {
        try {
            const sql = 'UPDATE Orders SET status=($1) WHERE id=($2)';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [status, id]);
            conn.release();
            return result.rowCount;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('order'));
        }
    }
}
exports.OrderStore = OrderStore;
