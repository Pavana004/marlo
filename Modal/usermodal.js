const mongoose = require("mongoose");


const schema = mongoose.Schema({

       firstname: { type: String, require: true },
       lastname: { type: String, require: true },
       dob: { type: String, require: true },
       phone: { type: String, require: true, unique: true },
       email: { type: String, require: true, unique: true },
       password: { type: String, require: true },
       occupation: { type: String, require: true },
       company: { type: String, require: true },


});

module.exports = mongoose.model("marlo", schema);