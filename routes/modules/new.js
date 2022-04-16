const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    try {
        return res.render('new')
    } catch (error) {
        console.error(error)
    }
})

module.exports = router