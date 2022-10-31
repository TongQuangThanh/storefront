"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const users_1 = require("../../models/users");
const const_1 = require("./const");
const orderStore = new orders_1.OrderStore();
const userStore = new users_1.UserStore();
const productStore = new products_1.ProductStore();
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
        const result = await userStore.create(const_1.user);
        expect(result.role).toEqual(const_1.user.role);
    });
    it('create method should add a admin as admin role', async () => {
        const result = await userStore.create(const_1.admin);
        expect(result.role).toEqual(const_1.admin.role);
    });
    it('index method should return a list of users', async () => {
        const result = await userStore.index();
        expect(result.length).toBeGreaterThanOrEqual(2);
    });
    it('show method should return a correct users', async () => {
        const result = await userStore.show(const_1.userId);
        expect(result).toBeTruthy();
    });
    it('authenticate method should return a correct users', async () => {
        const result = await userStore.authenticate(const_1.userId, const_1.userPassword);
        expect(result?.id).toEqual(const_1.user.id);
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
        const result = await productStore.create(const_1.product);
        expect(result.name).toEqual(const_1.product.name);
        expect(result.price).toEqual(const_1.product.price);
        expect(result.category).toEqual(const_1.product.category);
    });
    it('index method should return a list of products', async () => {
        const result = await productStore.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('show method should return the correct product', async () => {
        const result = await productStore.show(const_1.id);
        expect(result).toBeTruthy();
    });
    it('showProductByCategory method should return the correct product', async () => {
        const result = await productStore.showProductByCategory(const_1.category);
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
        const result = await orderStore.create(const_1.order);
        expect(result).toBeTruthy();
    });
    it('index method should return a list of orders', async () => {
        const result = await orderStore.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('show method with only userId should return the correct order', async () => {
        const result = await orderStore.show(const_1.userId);
        expect(result).toBeTruthy();
    });
    it('show method should return the correct order', async () => {
        const result = await orderStore.show(const_1.userId, const_1.id);
        expect(result).toBeTruthy();
    });
    it('updateStatus method should return the correct order', async () => {
        const rowCount = await orderStore.updateStatus(const_1.id, const_1.completedStatus);
        expect(rowCount).toEqual(1);
    });
});
