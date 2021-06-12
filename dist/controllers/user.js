"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.postSignup = void 0;
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
/**
 * Create a new local account.
 * @route POST /signup
 */
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("email", "Email is not valid").isEmail().run(req);
    yield express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
    yield express_validator_1.check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);
    const errors = express_validator_1.validationResult(req);
    console.log("here");
    if (!errors.isEmpty) {
        res.status(401).send({
            message: errors.array()
        });
    }
    console.log("here2");
    console.log(req.body);
    const user = new User_1.User({
        email: req.body.email,
        password: req.body.password
    });
    user.save((err) => {
        if (err) {
            return next(err);
        }
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
});
exports.postSignup = postSignup;
/**
* Sign in using email and password.
* @route POST /login
*/
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check("email", "Email is not valid").isEmail().run(req);
    yield express_validator_1.check("password", "Password cannot be blank").isLength({ min: 1 }).run(req);
    yield express_validator_1.sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).send({
            message: errors.array()
        });
    }
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401).send({
                message: info.message
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.send("User successfully registered");
        });
    })(req, res, next);
});
exports.postLogin = postLogin;
//# sourceMappingURL=user.js.map