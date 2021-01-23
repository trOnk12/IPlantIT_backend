const mongoose = require("mongoose");
const router = require('express').Router()

const User = mongoose.model("User");
const Device = mongoose.model("User");

// add the device 
router.post("/user",(req,res,next) =>{
    
    var user = new User();

    user._id = req.body.id;
    user.name  = req.body.name;
    user.devicesId = req.body.devicesId;
    user.fbToken  = req.body.fbToken;

    user.save().then(function(){
       return res.status(200);
    }).catch(next);

    });

//get the user with the device
router.get("/user",(req,res,next) => {
    User.findById(req.payload.id).then(function(user){

    });
});

//delte the user


module.exports = router
