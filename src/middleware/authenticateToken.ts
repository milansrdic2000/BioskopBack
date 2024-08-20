import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = data?.user;
    if (req.user?.isAdmin) return res.sendStatus(403); // an admin
    next();
  });
};
export const authenticateAdmin = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = data?.user;

    if (!req.user.isAdmin) return res.sendStatus(403); // Not an admin
    next();
  });
};
