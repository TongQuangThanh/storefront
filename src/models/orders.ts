import Client from "../db";
import { generateErrorOnCreate, generateErrorOnFetch } from "../utils";

export type Order = {
  id: number;
  user_id: number;
  status: string;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM Orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('order'));
    }
  }

  async show(userId: number, orderId?: number): Promise<Order | Order[]> {
    try {
      const conn = await Client.connect();
      let sql = '';
      let result;
      if (orderId) {
        sql = 'SELECT * FROM Orders WHERE user_id=($1) AND id=($2)';
        const res = await conn.query(sql, [userId, orderId]);
        result = res.rows[0];
      } else {
        sql = 'SELECT * FROM Orders WHERE user_id=($1)';
        const res = await conn.query(sql, [userId]);
        result = res.rows;
      }
      conn.release();
      return result;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('order'));
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO Orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnCreate('order'));
    }
  }

  async updateStatus(id: number, status: string): Promise<number> {
    try {
      const sql = 'UPDATE Orders SET status=($1) WHERE id=($2)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [status, id]);
      conn.release();
      return result.rowCount;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('order'));
    }
  }

}