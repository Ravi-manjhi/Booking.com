import { Router } from "express";
import { query } from "express-validator";
import { checkError } from "../middleware/error";
import { getHotels } from "../controllers/hotel.controller";

const router = Router();

router
  .route("/search")
  .get(
    [
      query("page")
        .isInt()
        .optional()
        .withMessage("page should be Numerical value"),
    ],
    checkError,
    getHotels
  );

export default router;
