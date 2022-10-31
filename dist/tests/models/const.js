"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQty = exports.order = exports.completedStatus = exports.status = exports.quantity = exports.productId = exports.orderId = exports.product2 = exports.category2 = exports.price2 = exports.name2 = exports.id2 = exports.product1 = exports.category1 = exports.price1 = exports.name1 = exports.id1 = exports.admin = exports.adminPassword = exports.adminRole = exports.adminLastName = exports.adminFirstName = exports.adminId = exports.user = exports.userPassword = exports.userRole = exports.userLastName = exports.userFirstName = exports.userId = exports.salt = exports.key = void 0;
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
exports.id1 = 1;
exports.name1 = 'Pepsi';
exports.price1 = 250;
exports.category1 = 'beverage';
exports.product1 = {
    id: exports.id1, name: exports.name1, price: exports.price1, category: exports.category1
};
exports.id2 = 2;
exports.name2 = 'Twister';
exports.price2 = 240;
exports.category2 = 'juice';
exports.product2 = {
    id: exports.id2, name: exports.name2, price: exports.price2, category: exports.category2
};
// order variable
exports.orderId = 1;
exports.productId = 1;
exports.quantity = 250;
exports.status = 'open';
exports.completedStatus = 'completed';
exports.order = {
    id: exports.orderId, user_id: exports.userId, status: exports.status
};
exports.productQty = [
    { productId: 1, quantity: 34 },
    { productId: 2, quantity: 76 }
];
