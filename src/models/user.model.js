const {Schema, model} = require("mongoose");


const userSchema = new Schema({
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    profile_url : {type : String, required : true}
})

module.exports = model("user", userSchema);