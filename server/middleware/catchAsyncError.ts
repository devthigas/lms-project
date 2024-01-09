import { NextFunction } from "express";
import { Request, Response } from "express";


export const catchAsyncError = (thenFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(thenFunc(req, res, next)).catch(next);

}