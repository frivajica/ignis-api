"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require("dotenv/config");
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    var _a;
    const bearerHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!bearerHeader)
        return res.sendStatus(403);
    //If token exists, extract and verify it.
    jwt.verify(bearerHeader, process.env.JWT_SECRET || 'superSecret', (error) => {
        if (error)
            return res.sendStatus(403);
        next();
    });
};
exports.auth = auth;
