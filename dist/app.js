"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
exports.app = app;
const port = 5000;
exports.port = port;
//parse json
app.use(express_1.default.json());
//url encoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
//application  route
// Application Routes
app.use('/api/v1/', routes_1.default);
// Global error handler
app.use(globalErrorHandler_1.default);
// Handle Not Found Route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
    next();
});
