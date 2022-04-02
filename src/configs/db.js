const mongoose = require("mongoose");

module.exports = ()=>{
    
    try {
        
        mongoose.connect("mongodb://127.0.0.1:27017/multer_assignment");
        console.log("serveris running on port no. 2234");

    } catch (err) {

        console.log(err.message)
        
    }
}