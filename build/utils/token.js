"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
require("dotenv/config");
const jwt = require("jsonwebtoken");
const generateToken = (user) => jwt.sign(user, process.env.JWT_SECRET || 'superSecret', { expiresIn: '360d' });
exports.generateToken = generateToken;
