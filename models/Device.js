var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  _id : String,
  name : String,
  humidity: {type: String,default:0},
  UV: {type:String,default:0}
});

mongoose.model("Device",DeviceSchema);



  