import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";

/**
 * Create a new local account.
 * @route POST /signup
 */
export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   
};