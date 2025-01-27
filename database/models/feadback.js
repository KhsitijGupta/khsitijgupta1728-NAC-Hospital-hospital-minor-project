const mongoose = require('mongoose');
const { Schema } = mongoose;

const feadbackSchema = new Schema({

  name:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true,
  },
  mobile:{
    type:String,
    require:true,
  },
  description:{
    type:String,

  }

});

const Feadback = mongoose.model('Feadback', feadbackSchema);
module.exports = Feadback;
