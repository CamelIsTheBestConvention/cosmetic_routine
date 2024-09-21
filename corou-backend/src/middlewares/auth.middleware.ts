import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("오쓰헤더", authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "토큰이 제공되지 않았습니다." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "유효하지 않은 토큰입니다.", error });
  }
};
