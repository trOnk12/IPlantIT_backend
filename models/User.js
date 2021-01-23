var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name : {
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  city:{
      type:String,
      required:false
  },
  password:{
    type:String,
    required:true
  }
});

mongoose.model("User",UserSchema);