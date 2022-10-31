import { ProductQty } from '../../models/order-product';
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
export const id1 = 1;
export const name1 = 'Pepsi';
export const price1 = 250;
export const category1 = 'beverage';
export const product1: Product = {
  id: id1, name: name1, price: price1, category: category1
};
export const id2 = 2;
export const name2 = 'Twister';
export const price2 = 240;
export const category2 = 'juice';
export const product2: Product = {
  id: id2, name: name2, price: price2, category: category2
};

// order variable
export const orderId = 1;
export const productId = 1;
export const quantity = 250;
export const status = 'open';
export const completedStatus = 'completed';
export const order: Order = {
  id: orderId, user_id: userId, status
};
export const productQty: ProductQty[] = [
  { productId: 1, quantity: 34 },
  { productId: 2, quantity: 76 }
];