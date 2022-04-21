const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const products = require('./modules/products')
const users = require('./modules/users')
const auth = require("./modules/auth")
const { authenticator } = require('../middleware/auth')

router.use('/products', authenticator, products)
router.use("/auth", auth)
router.use('/users', users)
router.use('/', authenticator, home)


module.exports = router