import bcrypt from 'bcrypt';
import Client from "../db";
import { generateErrorOnCreate, generateErrorOnFetch } from "../utils";

const key = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS || 10;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('user'));
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('user'));
    }
  }

  async authenticate(id: number, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE id=($1)';
    const result = await conn.query(sql, [id]);
    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + key, user.password)) {
        return user;
      }
    }
    return null;
  }

  async create(u: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (firstName, lastName, password, role) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(u.password + key, +salt);
      const conn = await Client.connect();
      const result = await conn.query(sql, [u.firstName, u.lastName, hash, u.role]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnCreate('user', u.firstName));
    }
  }
}