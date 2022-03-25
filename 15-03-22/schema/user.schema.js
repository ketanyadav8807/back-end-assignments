const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    movie_name: {type : String, required : true},
    production_year: {type : Number, required : true},
    budget:{type : Number, required : true},
});

const userModel = mongoose.model("user" , userSchema);
module.exports = userModel ;