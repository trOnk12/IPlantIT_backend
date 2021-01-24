const User = require('../models/user');
const Token = require('../models/token');
const {sendEmail} = require('../utils/email_sender');
// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    try {
        const email = req.body;

        const user = await User.findOne(email);

        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});

        const newUser = new User(req.body);

        const user_ = await newUser.save();

        if(user_){
            console.log("User created");
        }

        await sendVerificationEmail(user_, req, res);

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

async function sendVerificationEmail(user, req, res){
    try{
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        let subject = "Account Verification Token";
        let to = user.email;
        let from = "m.pachulski94@gmail.com";
        let link="http://"+req.headers.host+"/api/auth/verify/"+token.token;
        let html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({to, from, subject, html});

        res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}