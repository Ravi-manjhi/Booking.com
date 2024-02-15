import { Router } from "express";
import { body } from "express-validator";
import { checkError } from "../middleware/error";
import { upload } from "../middleware/multer";
import { createHotels } from "../controllers/myHotels.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post(
  "/create",
  [
    body("name")
      .notEmpty()
      .isString()
      .withMessage("Name must be String and required"),
    body("city")
      .notEmpty()
      .isString()
      .withMessage("city must be String and required"),
    body("country")
      .notEmpty()
      .isString()
      .withMessage("country must be String and required"),
    body("description")
      .notEmpty()
      .isString()
      .withMessage("description must be String and required"),
    body("type")
      .notEmpty()
      .isString()
      .withMessage("type must be String and required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("pricePerNight must be number and required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("facilities must be array and required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("adultCount must be number and required"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("childCount must be number and required"),
    body("imageUrls")
      .notEmpty()
      .isArray()
      .withMessage("imageUrls must be array and required"),
  ],
  checkError,
  upload.array("imageFiles", 6),
  verifyToken,
  createHotels
);

export default router;
