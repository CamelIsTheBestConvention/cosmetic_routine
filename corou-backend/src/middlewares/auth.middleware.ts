import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
    return; 
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다.", error });
  }
};
