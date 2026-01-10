import { Router } from "express"
import {getDriverProfileDetails, getrouteDetails, saveProfile} from "../controllers/driverProfileController"
// import { authenticate } from "../middleware/authMiddleware"

const router = Router();

router.post("/saveprofile", saveProfile)

router.get("/getroutedetails", getDriverProfileDetails);

router.get("/getroutedetailspasenger", getrouteDetails);

export default router