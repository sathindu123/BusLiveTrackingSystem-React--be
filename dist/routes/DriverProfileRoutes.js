"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const driverProfileController_1 = require("../controllers/driverProfileController");
// import { authenticate } from "../middleware/authMiddleware"
const router = (0, express_1.Router)();
router.post("/saveprofile", driverProfileController_1.saveProfile);
router.get("/getroutedetails", driverProfileController_1.getDriverProfileDetails);
router.get("/getroutedetailspasenger", driverProfileController_1.getrouteDetails);
exports.default = router;
