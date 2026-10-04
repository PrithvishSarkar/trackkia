import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import CustomError from "@/customError.js";

const globalErrorHandlingMiddleware: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let message: string = "Internal Server Error";
  let statusCode: number = 500;

  if (err instanceof CustomError) {
    message = err.message;
    statusCode = err.statusCode;
  } else message = err.message;

  res.status(statusCode).json({
    status: "failure",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default globalErrorHandlingMiddleware;
