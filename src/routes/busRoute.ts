import { Router } from "express"
import {saveProfile} from "../controllers/driverProfileController"
import { busroteSave } from "../controllers/busRouteController";
// import { authenticate } from "../middleware/authMiddleware"

const router = Router();

router.post("/saveprofile", saveProfile)
router.post("/saveroute", busroteSave)

export default router