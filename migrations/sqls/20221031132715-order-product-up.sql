CREATE TABLE IF NOT EXISTS order_product (
  id SERIAL PRIMARY KEY,
  product_id SERIAL REFERENCES products,
  order_id SERIAL REFERENCES orders,
  quantity integer
);