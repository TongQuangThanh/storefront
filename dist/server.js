"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./routers/products"));
const orders_1 = __importDefault(require("./routers/orders"));
const users_1 = __importDefault(require("./routers/users"));
exports.app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    origin: '',
    optionSuccessStatus: 200
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(body_parser_1.default.json());
exports.app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, users_1.default)(exports.app);
(0, orders_1.default)(exports.app);
(0, products_1.default)(exports.app);
exports.app.listen(port, function () {
    console.info(`[server]: Server is running on port ${port}, current time: `, new Date());
});
