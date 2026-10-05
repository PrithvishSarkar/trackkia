import type { Request, Response, NextFunction } from "express";

const userNameController = async (req: Request, res: Response, next: NextFunction) => {
  //

  try {
    //
  } catch (error) {
    console.error("Username Fetching Server Error");
    next(error);
  }
};

export default userNameController;