"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const driverProfileController_1 = require("../controllers/driverProfileController");
const busRouteController_1 = require("../controllers/busRouteController");
// import { authenticate } from "../middleware/authMiddleware"
const router = (0, express_1.Router)();
router.post("/saveprofile", driverProfileController_1.saveProfile);
router.post("/saveroute", busRouteController_1.busroteSave);
exports.default = router;
