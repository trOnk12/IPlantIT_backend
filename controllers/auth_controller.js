const User = mongoose.model("User");
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

        if(user){
            res.send(500,"user successfully created");
        }

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};