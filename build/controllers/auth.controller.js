"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../utils/auth");
const auth_service_1 = require("../services/auth.service");
const router = (0, express_1.Router)();
/**
 * Create an user
 * @auth none
 * @route {POST} /users
 * @bodyparam user User
 * @returns user User
 */
router.post('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.createUser)(req.body.user);
        res.json({ user });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * Login
 * @auth none
 * @route {POST} /users/login
 * @bodyparam user User
 * @returns user User
 */
router.post('/users/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.login)(req.body.user);
        res.json({ user });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * Get current user
 * @auth required
 * @route {GET} /user
 * @returns user User
 */
router.get('/user', auth_1.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield (0, auth_service_1.getUser)((_a = req.body.user) === null || _a === void 0 ? void 0 : _a.username);
        res.json({ user });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * Update user
 * @auth required
 * @route {PUT} /user
 * @bodyparam user User
 * @returns user User
 */
router.put('/user', auth_1.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = yield (0, auth_service_1.updateUser)(req.body.user, (_b = req.body.user) === null || _b === void 0 ? void 0 : _b.username);
        res.json({ user });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
