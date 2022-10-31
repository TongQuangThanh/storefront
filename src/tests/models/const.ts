import { Order } from '../../models/orders';
import { Product } from "../../models/products";
import { User } from "../../models/users";

// user variable
export const key = process.env.BCRYPT_PASSWORD;
export const salt = process.env.SALT_ROUNDS || 10;
export const userId = 1;
export const userFirstName = 'Thanh';
export const userLastName = 'Tong';
export const userRole = 'user';
export const userPassword = '123456';
export const user: User = {
  id: userId,
  firstName: userFirstName,
  lastName: userLastName,
  password: userPassword,
  role: userRole
};

export const adminId = 2;
export const adminFirstName = 'Thanh 2022';
export const adminLastName = 'Tong Quang';
export const adminRole = 'admin';
export const adminPassword = '123456';
export const admin: User = {
  id: adminId,
  firstName: adminFirstName,
  lastName: adminLastName,
  password: adminPassword,
  role: adminRole
};

// product variable
export const id = 1;
export const name = 'Pepsi';
export const price = 250;
export const category = 'beverage';
export const product: Product = {
  id, name, price, category
};

// order variable
export const orderId = 1;
export const productId = 1;
export const quantity = 250;
export const status = 'open';
export const completedStatus = 'completed';
export const order: Order = {
  id: orderId, user_id: userId, product_id: productId, quantity, status
};
