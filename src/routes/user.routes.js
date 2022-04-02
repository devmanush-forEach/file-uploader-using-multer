const express = require("express");
const fs = require("fs");

const router = express.Router();

const User = require("../models/user.model");

const upload = require("../utils/upload");

router.post("/", upload.single("profile_pic"), async (req, res) => {
    try {

        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_url: req.file.path,
        });

        res.status(200).send(user);

    } catch (err) {

        res.status(500).send(err.message);

    }
})

router.get("/", async (req, res) => {
    try {

        const user = await User.find().lean().exec();
        // console.log(user);

        return res.status(200).send(user);

    } catch (err) {

        return res.status(500).send(err.message);

    }
})

router.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        console.log(user);
        fs.unlink(user.profile_url, function (err) {
            if (err) console.log(err);
            console.log("deleted");
        });
        return res.status(201).send(user);

    } catch (err) {

        return res.status(500).send(err.message);

    }
})

router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body).lean().exec();
        if (req.file) {
            const user = await User.findByIdAndUpdate(req.params.id, {
                profile_url: req.file.path
            }).lean().exec();
            fs.unlink(user.profile_url, function (err) {
                if (err) console.log(err.message)
                console.log("Updated");
            })
        }
        console.log(user);
        return res.status(201).send(user);

    } catch (err) {

        return res.status(500).send(err.message);

    }
})

module.exports = router;