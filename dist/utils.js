"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorOnCreate = exports.generateErrorOnFetch = exports.clientError = exports.errorMissingField = exports.errorForbidden = exports.errorLoginRequired = void 0;
exports.errorLoginRequired = 'Please login first!';
exports.errorForbidden = 'You have no right to access this feature!';
exports.errorMissingField = 'Missing required field. Please help to provide all required field';
exports.clientError = 'Some error(s) occur. Please try again later!';
const generateErrorOnFetch = (model) => `Error on get ${model}. Please provide all required information and try again later`;
exports.generateErrorOnFetch = generateErrorOnFetch;
const generateErrorOnCreate = (model, modelName = '') => `Error on create new ${model} with name ${modelName}. Please provide all required information and try again later`;
exports.generateErrorOnCreate = generateErrorOnCreate;