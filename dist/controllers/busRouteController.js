"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busroteSave = void 0;
const routeDetails_model_1 = require("../models/routeDetails.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const busroteSave = async (req, res) => {
    try {
        const { buscode, startstation, endstation, startTime, endTime, shAvilable, startORoffline } = req.body;
        if (!buscode || !startstation || !endstation || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingDriver = await routeDetails_model_1.Route.findOne({ buscode });
        if (existingDriver) {
            existingDriver.startstation = startstation;
            existingDriver.endstation = endstation;
            existingDriver.startTime = startTime;
            existingDriver.endTime = endTime;
            existingDriver.shAvilable = shAvilable;
            existingDriver.startORoffline = startORoffline;
            await existingDriver.save();
            return res.status(200).json({
                message: "Profile updated successfully ",
                driver: existingDriver
            });
        }
        const newBus = new routeDetails_model_1.Route({
            buscode,
            startstation,
            endstation,
            startTime,
            endTime,
            shAvilable,
            startORoffline
        });
        await newBus.save();
        res.status(201).json({
            message: "Succsess"
        });
    }
    catch (err) {
        res.status(500).json({ message: err?.message });
    }
};
exports.busroteSave = busroteSave;
