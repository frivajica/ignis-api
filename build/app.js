"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
//* EXPRESS AND PRISMA SET UP
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
app.use(express_1.default.static('public')); // Serves images
//* ERROR HANDLER
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
//* SERVER SET UP
const PORT = process.env.__YOUR_PRISMA_SERVER_PORT__ || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
