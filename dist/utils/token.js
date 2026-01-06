"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;
const signAccessToken = (user) => {
    console.log("ACCESS_TOKEN_SECRET =", ACCESS_TOKEN_SECRET);
    console.log("USER ID =", user?._id);
    return jsonwebtoken_1.default.sign({
        sub: user._id.toString(),
        username: user.username,
    }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({
        sub: user._id.toString(),
        username: user.username,
    }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
exports.signRefreshToken = signRefreshToken;
