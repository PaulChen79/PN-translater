const express = require('express');
const User = require("../../models/user")
const router = express.Router()


router.get("/", (req, res) => {
    try {
        return res.render('register')
    } catch (error) {
        console.error(error)
    }
})

router.post("/", (req, res) => {
    try {
        User.create(req.body)
            .then(() => res.redirect("/"))
    } catch (error) {
        console.error(error)
    }
})

module.exports = router