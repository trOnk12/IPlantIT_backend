var mongoose = require('mongoose');

const crypto = require('crypto');
const Token = require('./token');

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


UserSchema.methods.generateVerificationToken = function() {
  let payload = {
      userId: this._id,
      token: crypto.randomBytes(20).toString('hex')
  };

  return new Token(payload);
};

module.exports = mongoose.models.User || mongoose.model('User',UserSchema);