import { Router } from "express";
import { upload } from "../middleware/multer";
import {
  createHotels,
  getMyHotelById,
  getMyHotelCtrl,
  updatedHotel,
} from "../controllers/myHotels.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router
  .route("/")
  .post(verifyToken, upload.array("imageFiles", 6), createHotels)
  .get(verifyToken, getMyHotelCtrl);

router
  .route("/:id")
  .get(verifyToken, getMyHotelById)
  .put(verifyToken, upload.array("imageFiles"), updatedHotel);

export default router;
