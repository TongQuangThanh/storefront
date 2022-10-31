"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const token_1 = require("../middleware/token");
const utils_1 = require("../utils");
const store = new users_1.UserStore();
const index = async (req, res) => {
    try {
        const users = await store.index();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('user'));
    }
};
const show = async (req, res) => {
    try {
        const id = +req.params.id;
        if (id) {
            const user = await store.show(id);
            res.status(200).json(user);
        }
        else {
            res.status(400).json((0, utils_1.generateErrorOnFetch)('user'));
        }
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnFetch)('user'));
    }
};
const create = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.password) {
        res.status(400).json((0, utils_1.generateErrorOnCreate)('user', req.body.firstName));
        return;
    }
    const user = {
        id: 0,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        role: req.body.role || 'user',
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json((0, utils_1.generateErrorOnCreate)('user', user.firstName));
    }
};
const login = async (req, res) => {
    try {
        const u = await store.authenticate(req.body.id, req.body.password);
        if (u) {
            const token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
            res.status(200).json(token);
        }
        else {
            res.status(401).json('User not found!!!');
        }
    }
    catch (error) {
        res.status(401).json(error);
    }
};
const userRouters = (app) => {
    app.post('/users/login', login); // login
    app.get('/users', token_1.adminAuthorization, index); // admin see all user
    app.get('/users/:id', token_1.userAuthenticated, show); // user see user info
    app.post('/users', create); // create user
};
exports.default = userRouters;
