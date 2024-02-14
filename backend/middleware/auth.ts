import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];

  if (!token)
    return res.status(401).json({ status: "Failed", message: "Unauthorized" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRETE_KEY as string);

    req.userId = (decode as JwtPayload).userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "Failed", message: "Unauthorized" });
  }
};
