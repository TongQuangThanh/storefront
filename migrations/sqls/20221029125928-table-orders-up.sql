CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  product_id SERIAL REFERENCES products,
  user_id SERIAL REFERENCES users,
  quantity integer,
  status VARCHAR(100)
);