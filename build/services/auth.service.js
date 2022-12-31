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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserIdByUsername = exports.updateUser = exports.getUser = exports.login = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_client_1 = __importDefault(require("../prisma/prisma-client"));
const token_1 = require("../utils/token");
const http_exception_model_1 = __importDefault(require("../models/http-exception.model"));
const checkUserUniqueness = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUserByEmail = yield prisma_client_1.default.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
    const existingUserByUsername = yield prisma_client_1.default.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });
    if (existingUserByEmail || existingUserByUsername) {
        throw new http_exception_model_1.default(422, {
            errors: Object.assign(Object.assign({}, (existingUserByEmail ? { email: ['has already been taken'] } : {})), (existingUserByUsername ? { username: ['has already been taken'] } : {})),
        });
    }
});
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const email = (_a = input.email) === null || _a === void 0 ? void 0 : _a.trim();
    const username = (_b = input.username) === null || _b === void 0 ? void 0 : _b.trim();
    const password = (_c = input.password) === null || _c === void 0 ? void 0 : _c.trim();
    const { image, bio } = input;
    if (!email) {
        throw new http_exception_model_1.default(422, { errors: { email: ["can't be blank"] } });
    }
    if (!username) {
        throw new http_exception_model_1.default(422, { errors: { username: ["can't be blank"] } });
    }
    if (!password) {
        throw new http_exception_model_1.default(422, { errors: { password: ["can't be blank"] } });
    }
    yield checkUserUniqueness(email, username);
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield prisma_client_1.default.user.create({
        data: Object.assign(Object.assign({ username,
            email, password: hashedPassword }, (image ? { image } : {})), (bio ? { bio } : {})),
        select: {
            email: true,
            username: true,
            bio: true,
            image: true,
        },
    });
    return Object.assign(Object.assign({}, user), { token: (0, token_1.generateToken)(user) });
});
exports.createUser = createUser;
const login = (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const email = (_d = userPayload.email) === null || _d === void 0 ? void 0 : _d.trim();
    const password = (_e = userPayload.password) === null || _e === void 0 ? void 0 : _e.trim();
    if (!email) {
        throw new http_exception_model_1.default(422, { errors: { email: ["can't be blank"] } });
    }
    if (!password) {
        throw new http_exception_model_1.default(422, { errors: { password: ["can't be blank"] } });
    }
    const user = yield prisma_client_1.default.user.findUnique({
        where: {
            email,
        },
        select: {
            email: true,
            username: true,
            password: true,
            bio: true,
            image: true,
        },
    });
    if (user) {
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (match) {
            return {
                email: user.email,
                username: user.username,
                bio: user.bio,
                image: user.image,
                token: (0, token_1.generateToken)(user),
            };
        }
    }
    throw new http_exception_model_1.default(403, {
        errors: {
            'email or password': ['is invalid'],
        },
    });
});
exports.login = login;
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield prisma_client_1.default.user.findUnique({
        where: {
            username,
        },
        select: {
            email: true,
            username: true,
            bio: true,
            image: true,
        },
    }));
    return Object.assign(Object.assign({}, user), { token: (0, token_1.generateToken)(user) });
});
exports.getUser = getUser;
const updateUser = (userPayload, loggedInUsername) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, image, bio } = userPayload;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield prisma_client_1.default.user.update({
        where: {
            username: loggedInUsername,
        },
        data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (email ? { email } : {})), (username ? { username } : {})), (password ? { password: hashedPassword } : {})), (image ? { image } : {})), (bio ? { bio } : {})),
        select: {
            email: true,
            username: true,
            bio: true,
            image: true,
        },
    });
    return Object.assign(Object.assign({}, user), { token: (0, token_1.generateToken)(user) });
});
exports.updateUser = updateUser;
const findUserIdByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_client_1.default.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });
    if (!user) {
        throw new http_exception_model_1.default(404, {});
    }
    return user;
});
exports.findUserIdByUsername = findUserIdByUsername;
