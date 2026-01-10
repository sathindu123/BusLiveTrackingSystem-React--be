"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyDetails = exports.handleRefreshToken = exports.login = exports.userRegister = void 0;
const user_modle_1 = require("../models/user.modle");
const token_1 = require("../utils/token");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const userRegister = async (req, res) => {
    try {
        const { busNb, username, password, telNb } = req.body;
        if (!busNb || !username || !password || !telNb) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingbusNb = await user_modle_1.User.findOne({ busNb });
        if (existingbusNb) {
            return res.status(400).json({ message: "BusNb alrady registered" });
        }
        const hashedpassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new user_modle_1.User({
            busNb,
            username,
            password: hashedpassword,
            telNb
        });
        await newUser.save();
        res.status(201).json({
            message: "Author registered successfully. waiting for approvel"
        });
    }
    catch (err) {
        res.status(500).json({ message: err?.message });
    }
};
exports.userRegister = userRegister;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const exitsingBus = await user_modle_1.User.findOne({ username });
        if (!exitsingBus) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const valid = await bcryptjs_1.default.compare(password, exitsingBus.password);
        if (!valid) {
            return res.status(401).json({ message: "Invalid credensssstials" });
        }
        const accessToken = (0, token_1.signAccessToken)(exitsingBus);
        const refreshToken = (0, token_1.signRefreshToken)(exitsingBus);
        res.status(200).json({
            message: "success",
            data: {
                busNb: exitsingBus.busNb,
                accessToken,
                refreshToken
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: err?.message });
    }
};
exports.login = login;
const handleRefreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Token Required" });
        }
        const payload = jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
        const user = await user_modle_1.User.findById(payload.sub);
        if (!user) {
            return res.status(400).json({ message: "invalid refresh token" });
        }
    }
    catch (err) {
        res.status(403).json({ message: "invalid expire token" });
    }
};
exports.handleRefreshToken = handleRefreshToken;
const getMyDetails = async (req, res) => {
    const userId = req.user.sub;
    const user = (await user_modle_1.User.findById(userId).select("-password")) || null;
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const { busNb, username, password, telNb } = user;
    res.status(200).json({
        message: "Ok",
        data: { busNb, username, password, telNb }
    });
};
exports.getMyDetails = getMyDetails;
