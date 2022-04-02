const express = require("express");

const app = express();

userRoutes = require("./routes/user.routes")
galleryRoutes = require("./routes/gallery.routes")

app.use(express.json());

app.use("/user" , userRoutes)
app.use("/gallery", galleryRoutes)

module.exports = app;