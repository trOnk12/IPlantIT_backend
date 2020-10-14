const mongoose = require("mongoose");
const router = require('express').Router()

const Device = mongoose.model("Device");

// add the device 
router.post("/device",(req,res,next) =>{
        
    //check if exists, avoid duplication
    Device.findById(req.body.id).then(function(device){
        if(device){
           res.status(401).json("Devie which provided id already exists");
        }else{
            var device = new Device();

            device.id = req.body.id;
            device.name = req.body.name;
        
            device.save().then(function(){
                return res.status(200).json("Device added successfully");
            }).catch(next);
        }
    }).catch(next);
   
})

//get the device

//delete the device


module.exports = router
