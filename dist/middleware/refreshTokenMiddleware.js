"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ message: "Not found refresh token" });
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Invalid refresh token" });
        req.user = decoded;
        next();
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
