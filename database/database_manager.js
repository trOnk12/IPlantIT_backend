//Import the monogoose
const mongoose = require('mongoose')
const databaseConfig = require("./database_config")

//Set up the connection
mongoose.connect(databaseConfig.mongodbUri,{useNewUrlParser:true})

let db = mongoose.connection
db.on('error', console.error.bind(console,"MongoDB connection error:"));

//Expose connection
module.exports = mongoose.connection


