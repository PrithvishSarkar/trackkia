// Extend Express Request interface to include 'user'.
import "express";

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}
