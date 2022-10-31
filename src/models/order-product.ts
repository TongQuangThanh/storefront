import Client from "../db";
import { generateErrorOnCreate } from "../utils";

export type ProductQty = {
  productId: number,
  quantity: number
}

export type OrderProduct = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

export class OrderProductStore {
  async create(orderId: number, productQty: ProductQty[]): Promise<OrderProduct[]> {
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
      const conn = await Client.connect();
      const resultOrderProduct = await conn.query(sqlOrderProduct);
      conn.release();
      return resultOrderProduct.rows;
    } catch (err) {
      console.error(err);
      throw new Error(generateErrorOnCreate('order'));
    }
  }
}