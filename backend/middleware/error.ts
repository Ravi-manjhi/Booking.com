import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export async function checkError(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ status: "failed", message: error.array() });
  }

  next();
}
