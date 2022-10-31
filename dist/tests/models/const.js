"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.completedStatus = exports.status = exports.quantity = exports.productId = exports.orderId = exports.product = exports.category = exports.price = exports.name = exports.id = exports.admin = exports.adminPassword = exports.adminRole = exports.adminLastName = exports.adminFirstName = exports.adminId = exports.user = exports.userPassword = exports.userRole = exports.userLastName = exports.userFirstName = exports.userId = exports.salt = exports.key = void 0;
// user variable
exports.key = process.env.BCRYPT_PASSWORD;
exports.salt = process.env.SALT_ROUNDS || 10;
exports.userId = 1;
exports.userFirstName = 'Thanh';
exports.userLastName = 'Tong';
exports.userRole = 'user';
exports.userPassword = '123456';
exports.user = {
    id: exports.userId,
    firstName: exports.userFirstName,
    lastName: exports.userLastName,
    password: exports.userPassword,
    role: exports.userRole
};
exports.adminId = 2;
exports.adminFirstName = 'Thanh 2022';
exports.adminLastName = 'Tong Quang';
exports.adminRole = 'admin';
exports.adminPassword = '123456';
exports.admin = {
    id: exports.adminId,
    firstName: exports.adminFirstName,
    lastName: exports.adminLastName,
    password: exports.adminPassword,
    role: exports.adminRole
};
// product variable
exports.id = 1;
exports.name = 'Pepsi';
exports.price = 250;
exports.category = 'beverage';
exports.product = {
    id: exports.id, name: exports.name, price: exports.price, category: exports.category
};
// order variable
exports.orderId = 1;
exports.productId = 1;
exports.quantity = 250;
exports.status = 'open';
exports.completedStatus = 'completed';
exports.order = {
    id: exports.orderId, user_id: exports.userId, product_id: exports.productId, quantity: exports.quantity, status: exports.status
};
