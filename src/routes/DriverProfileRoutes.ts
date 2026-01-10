import { Router } from "express"
import {getDriverProfileDetails, saveProfile} from "../controllers/driverProfileController"
// import { authenticate } from "../middleware/authMiddleware"

const router = Router();

router.post("/saveprofile", saveProfile)

router.get("/getroutedetails", getDriverProfileDetails);

export default router