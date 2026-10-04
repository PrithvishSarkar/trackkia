export default class CustomError extends Error {
  public statusCode: number = 0;
  public isOperational: boolean = true;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}
