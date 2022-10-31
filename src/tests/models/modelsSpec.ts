import { OrderProductStore } from "../../models/order-product";
import { OrderStore } from "../../models/orders";
import { ProductStore } from "../../models/products";
import { UserStore } from "../../models/users";
import { admin, category1, completedStatus, id1, order, orderId, product1, product2, productQty, user, userId, userPassword } from "./const";

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderProductStore = new OrderProductStore();
let createdOrderId = 0;

describe("User model", () => {
  it("should have an index method", () => {
    expect(userStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userStore.create).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(userStore.authenticate).toBeDefined();
  });


  it('create method should add a user as user role', async () => {
    const result = await userStore.create(user);
    expect(result.role).toEqual(user.role);
  });

  it('create method should add a admin as admin role', async () => {
    const result = await userStore.create(admin);
    expect(result.role).toEqual(admin.role);
  });

  it('index method should return a list of users', async () => {
    const result = await userStore.index();
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it('show method should return a correct users', async () => {
    const result = await userStore.show(userId);
    expect(result).toBeTruthy();
  });

  it('authenticate method should return a correct users', async () => {
    const result = await userStore.authenticate(userId, userPassword);
    expect(result?.id).toEqual(user.id);
  });

  it('authenticate method should not return when invalid users', async () => {
    const result = await userStore.authenticate(1, 'cz');
    expect(result).toEqual(null);
  });
});



describe("Product model", () => {
  it("should have an index method", () => {
    expect(productStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('should have a popular method', () => {
    expect(productStore.popular).toBeDefined();
  });

  it('should have a showProductByCategory method', () => {
    expect(productStore.showProductByCategory).toBeDefined();
  });


  it('create method should add a product', async () => {
    const result = await productStore.create(product1);
    expect(result.name).toEqual(product1.name);
    expect(result.price).toEqual(product1.price);
    expect(result.category).toEqual(product1.category);
  });

  it('create method should add a product', async () => {
    const result = await productStore.create(product2);
    expect(result.name).toEqual(product2.name);
    expect(result.price).toEqual(product2.price);
    expect(result.category).toEqual(product2.category);
  });

  it('index method should return a list of products', async () => {
    const result = await productStore.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('show method should return the correct product', async () => {
    const result = await productStore.show(id1);
    expect(result).toBeTruthy();
  });

  it('showProductByCategory method should return the correct product', async () => {
    const result = await productStore.showProductByCategory(category1);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});



describe("Order model", () => {
  it("should have an index method", () => {
    expect(orderStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a updateStatus method', () => {
    expect(orderStore.updateStatus).toBeDefined();
  });


  it('create method should add a order', async () => {
    const result = await orderStore.create(order);
    createdOrderId = result.id;
    expect(result).toBeTruthy();
  });


  it('index method should return a list of orders', async () => {
    const result = await orderStore.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('show method with only userId should return the correct order', async () => {
    const result = await orderStore.show(userId);
    expect(result).toBeTruthy();
  });


  it('show method should return the correct order', async () => {
    const result = await orderStore.show(userId, orderId);
    expect(result).toBeTruthy();
  });

  it('updateStatus method should return the correct order', async () => {
    const rowCount = await orderStore.updateStatus(orderId, completedStatus);
    expect(rowCount).toEqual(1);
  });
});


describe("Order Product model", () => {
  it('should have a create method', () => {
    expect(orderProductStore.create).toBeDefined();
  });


  it('create method should add record to order product table', async () => {
    const result = await orderProductStore.create(createdOrderId, productQty);
    expect(result.length).toBeGreaterThanOrEqual(productQty.length);
  });

});