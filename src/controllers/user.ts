import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { NativeError } from "mongoose";
import { User, UserDocument } from "../models/User";
import nodemailer from "nodemailer";
import async from "async";


/**
 * Create a new local account.
 * @route POST /signup
 */
export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
    await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty) {
        res.status(401).send({
            message: errors.array()
        });
    }

    User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
        if (err) { return next(err); }
        if (existingUser) {
            res.status(401).send({
                message: 'User already exists.'
            });
        }
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });
        user.save((err) => {
            if (err) { return next(err); }
            res.send("User successfully registered");
        });
    });
};


