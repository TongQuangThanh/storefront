import Client from "../db";
import { generateErrorOnCreate, generateErrorOnFetch } from "../utils";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('product'));
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('product'));
    }
  }

  async popular(): Promise<Product[]> {
    try {
      const sql = 'SELECT *, SUM(quantity) as SUM FROM orders GROUP BY product_id, id ORDER BY SUM DESC LIMIT 5';
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('product'));
    }
  }

  async showProductByCategory(category: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE category=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnFetch('product'));
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnCreate('product', p.name));
    }
  }
}