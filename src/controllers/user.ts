import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { NativeError } from "mongoose";
import { IVerifyOptions } from "passport-local";
import passport from "passport";
import { User, UserDocument } from "../models/User";


/**
 * Create a new local account.
 * @route POST /signup
 */
export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
    await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);

    const errors = validationResult(req);
    console.log("here");
    if (!errors.isEmpty) {
        res.status(401).send({
            message: errors.array()
        });
    }

    console.log("here2");
    console.log(req.body);

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save((err) => {
        if (err) { return next(err); }
        res.send("User successfully registered");
    });
    // User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
    //     if (err) { return next(err); }
    //     if (existingUser) {
    //         res.status(401).send({
    //             message: 'User already exists.'
    //         });
    //     }
  
    // });
};
/**
* Sign in using email and password.
* @route POST /login
*/
export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank").isLength({ min: 1 }).run(req);
    await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(401).send({
            message: errors.array()
        });
    }

    passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            res.status(401).send({
                message: info.message
            });
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            res.send("User successfully registered");
        });
    })(req, res, next);
};

