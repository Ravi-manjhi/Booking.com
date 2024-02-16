import { Request, Response } from "express";
import path from "path";

export const staticRender = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../../frontend/dist/index.html"));
};
