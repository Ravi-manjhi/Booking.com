import { Router } from "express";
import { body } from "express-validator";
import { checkError } from "../middleware/error";
import { upload } from "../middleware/multer";
import {
  createHotels,
  getMyHotelCtrl,
} from "../controllers/myHotels.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/", verifyToken, upload.array("imageFiles", 6), createHotels);
router.get("/", verifyToken, getMyHotelCtrl);

export default router;
