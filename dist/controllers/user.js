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
exports.postSignup = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Create a new local account.
 * @route POST /signup
 */
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // await check("email", "Email is not valid").isEmail().run(req);
    // await check("password", "Password must be at least 4 characters long").isLength({ min: 4 }).run(req);
    // await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: 'donutsforlove@gmail.com',
            pass: 'acostam12'
        }
    });
    const mailOptions = {
        to: req.body.email,
        from: "iplant@gmail.com",
        subject: "Welcome to IPlant",
        text: `Hello,\n\nThis is a confirmation that the password for your account ${req.body.email} has just been changed.\n`
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return next(err);
        }
        res.send("user creation succesfull");
        // done(err);
    });
    // const errors = validationResult(req);
    // if (!errors.isEmpty) {
    //     res.status(401).send({
    //         message: errors.array()
    //     });
    // }
    // async.waterfall([
    //     function createUser(done: (err: Error, user: UserDocument) => void) {
    //         User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
    //             if (err) { return next(err); }
    //             if (existingUser) {
    //                 res.status(401).send({
    //                     message: 'User already exists.'
    //                 });
    //             }
    //             const user = new User({
    //                 email: req.body.email,
    //                 password: req.body.password
    //             });
    //             user.save((err) => {
    //                 if (err) { return next(err); }
    //                 res.send("User successfully registered");
    //             });
    //         });
    //     },
    //     function sendConfirmationEmail(user: UserDocument, done: (err: Error) => void) {
    //         const transporter = nodemailer.createTransport({
    //             service: "gmail",
    //             auth: {
    //                 user: 'donutsforlove@gmail.com',
    //                 pass: 'Acostam12@'
    //             }
    //         });
    //         const mailOptions = {
    //             to: user.email,
    //             from: "iplant@gmail.com",
    //             subject: "Welcome to IPlant",
    //             text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
    //         };
    //         transporter.sendMail(mailOptions, (err: Error) => {
    //             res.send("user creation succesfull");
    //             done(err);
    //         });
    //     }
    // ], (err) => {
    //     if (err) { return next(err); }
    //     res.redirect("/");
    // });
});
exports.postSignup = postSignup;
//# sourceMappingURL=user.js.map