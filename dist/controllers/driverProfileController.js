"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDriverProfileDetails = exports.saveProfile = void 0;
const driver_modle_1 = require("../models/driver.modle");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saveProfile = async (req, res) => {
    try {
        const { fullname, telNb, buscode, startstation, endstation } = req.body;
        if (!fullname || !telNb || !buscode || !startstation || !endstation) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingDriver = await driver_modle_1.Driver.findOne({ buscode });
        if (existingDriver) {
            existingDriver.fullname = fullname;
            existingDriver.telNb = telNb;
            existingDriver.startstation = startstation;
            existingDriver.endstation = endstation;
            await existingDriver.save();
            return res.status(200).json({
                message: "Profile updated successfully ",
                driver: existingDriver
            });
        }
        const newDriver = new driver_modle_1.Driver({
            fullname,
            telNb,
            buscode,
            startstation,
            endstation
        });
        await newDriver.save();
        res.status(201).json({
            message: "Driver registered successfully.",
            driver: newDriver
        });
    }
    catch (err) {
        return res.status(500).json({ message: err?.message });
    }
};
exports.saveProfile = saveProfile;
const getDriverProfileDetails = async (req, res) => {
    try {
        console.log("mokd wenne");
        const buscode = req.query.busCode; // capital C match කරන්න
        if (!buscode) {
            return res.status(400).json({ message: "Bus code is required" });
        }
        const route = await driver_modle_1.Driver.findOne({ buscode: buscode }); // database field name: buscode
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json({ message: "Ok", data: route });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getDriverProfileDetails = getDriverProfileDetails;
