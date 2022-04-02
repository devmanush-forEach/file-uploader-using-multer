const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");
const User = require("../models/user.model")

const gallerySchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : User,
    },
    photo_url : [{type : String,required : true}]
})

module.exports = model("gallery", gallerySchema);