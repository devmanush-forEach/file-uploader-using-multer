const express = require("express");
const fs = require("fs");
const router = express.Router()

const Gallery = require("../models/gallery.model");

const upload = require("../utils/upload")

router.post("/", upload.array("photo", 5), async (req, res) => {
    try {
        var files = req.files.map((file) => file.path);

        var gallery = await Gallery.create({
            user_id: req.body.user_id,
            photo_url: files
        });
        return res.status(201).send(gallery);
    } catch (err) {

        return res.status(500).send(err.message);

    }
})

router.get("/", async (req, res) => {
    try {
        var gallery = await Gallery.find().populate("user_id", select = { first_name: 1, last_name: 1 }).lean().exec();
        return res.status(200).send(gallery);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id).lean().exec();
        const array = gallery.photo_url;

        console.log(array);

        array.forEach(pic => {

            fs.unlink(pic, function (err) {
                if (err) console.log(err.message);
                console.log("Deleted fron server");
            })
        });
        return res.status(202).send(gallery);

    } catch (err) {
        return res.status(500).send(err.message);
    }
})


module.exports = router;