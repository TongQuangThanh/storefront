"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const utils_1 = require("../utils");
const key = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS || 10;
class UserStore {
    async index() {
        try {
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('user'));
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnFetch)('user'));
        }
    }
    async authenticate(id, password) {
        const conn = await db_1.default.connect();
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + key, user.password)) {
                return user;
            }
        }
        return null;
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO users (firstName, lastName, password, role) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + key, +salt);
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [u.firstName, u.lastName, hash, u.role]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            console.error(err);
            throw new Error((0, utils_1.generateErrorOnCreate)('user', u.firstName));
        }
    }
}
exports.UserStore = UserStore;
