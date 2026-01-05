"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const signAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({
        sub: user._id.toString(),
        busnb: user.busNb,
    }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
exports.signAccessToken = signAccessToken;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const signRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({
        sub: user._id.toString(),
        busnb: user.busNb,
    }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
exports.signRefreshToken = signRefreshToken;
