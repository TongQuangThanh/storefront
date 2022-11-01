import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export default new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.ENV?.trim() === 'test' ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});