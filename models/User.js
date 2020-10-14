var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: String,
  name : String,
  devicesId: [String],
  fbToken : String
});

mongoose.model("User",UserSchema);