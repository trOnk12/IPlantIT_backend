//Import the monogoose
const mongoose = require('mongoose')
const databaseConfig = require("./config")

//Set up the connection
function connect(){
    mongoose.connect(databaseConfig.mongodbUri,{useNewUrlParser:true});
}

let db = mongoose.connection
db.on('error', console.error.bind(console,"MongoDB connection error:"));

//Expose connection
module.exports = { connect };


