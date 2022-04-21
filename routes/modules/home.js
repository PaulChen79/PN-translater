const express = require('express')
const router = express.Router()
const PN = require("../../models/PN")

router.get('/', (req, res) => {
  const userId = req.user._id
  PN.find({ userId })
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(pns => res.render('products', { pns }))
    .catch(error => console.error(error))
})

module.exports = router