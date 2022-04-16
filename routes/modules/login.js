const express = require('express');
const User = require("../../models/user")
const router = express.Router()

router.get("/", (req, res) => {
    try {
        return res.render('login')
    } catch (error) {
        console.error(error)
    }
})

router.post("/", async(req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    User.findOne({ email: userEmail })
        .lean()
        .then(user => {
            if (user.email !== userEmail || user.password !== userPassword) {
                return res.render("login")
            } else {
                return res.redirect("/products")
            }
        })

})

module.exports = router