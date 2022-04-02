const path = require("path");
const multer = require("multer");



const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, uniqueSuffix + "-" + file.originalname )
    }
})


const fileFilter  = (req, file, callback)=> {

    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" ){
        callback(null, true)
    }else{
        callback(null, false);
    }
    
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
})

module.exports = upload;