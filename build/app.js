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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const routes_1 = __importDefault(require("./routes"));
//*EXPRESS AND PRISMA SET UP
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
app.use(express_1.default.static('public')); // Serves images
//#######################
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const newUser = await prisma.user.create({
        //   data: {
        //     name: 'Alice',
        //     email: 'alice@prisma.io',
        //   },
        // })
        const users = yield prisma.user.findMany();
        return res.json({
            success: true,
            data: users
        });
    }
    catch (error) {
        return res.json({
            success: false,
            error: error,
            message: error.message
        });
    }
}));
//#######################
//*ERROR HANDLER
/* eslint-disable */
app.use((err, req, res, next) => {
    // @ts-ignore
    if (err && err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            message: 'missing authorization credentials',
        });
        // @ts-ignore
    }
    else if (err && err.errorCode) {
        // @ts-ignore
        res.status(err.errorCode).json(err.message);
    }
    else if (err) {
        res.status(500).json(err.message);
    }
});
//*SERVER SET UP
const PORT = process.env.__YOUR_PRISMA_SERVER_PORT__ || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
