const express = require('express');
const PN = require("../../models/PN")
const router = express.Router()


router.get("/", (req, res) => {
    PN.find()
        .lean()
        .then(pn => res.render('products', { pn }))
        .catch(error => console.error(error))
})

router.post("/", (req, res) => {
    PN.create(req.body)
        .then(() => res.redirect("/products"))
        .catch(error => console.error(error))
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    PN.findById(id)
        .lean()
        .then(pn => res.render("edit", { pn: pn }))
        .catch(error => console.error(error))
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    PN.findByIdAndUpdate(id, req.body)
        .lean()
        .then(() => res.redirect("/products"))
        .catch(error => console.error(error))
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    PN.findByIdAndDelete(id)
        .then(() => res.redirect("/products"))
        .catch(error => console.error(error))
})

module.exports = router